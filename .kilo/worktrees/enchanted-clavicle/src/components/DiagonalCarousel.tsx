import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../shaders/carouselShaders';

const IMAGE_PATHS = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
  '/images/hero-4.jpg',
  '/images/hero-5.jpg',
  '/images/hero-6.jpg',
  '/images/hero-7.jpg',
  '/images/hero-8.jpg',
];

const PLANE_WIDTH = 0.3;
const DIAGONAL_ANGLE = 45;
const SPACING = 0.45;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default function DiagonalCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const angleRad = (Math.PI * DIAGONAL_ANGLE) / 180;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1000, 1000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x111111, 1);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(1, 1, 16, 16);
    const objs: { mesh: THREE.Mesh; material: THREE.ShaderMaterial }[] = [];

    let currentSpeed = 0;
    let targetSpeed = 0;
    let scrollTargetSpeed = 0;
    let animFrameId: number;

    const infiniteAxis = new THREE.Vector3(0, 1, 0).applyAxisAngle(
      new THREE.Vector3(0, 0, 1),
      THREE.MathUtils.degToRad(DIAGONAL_ANGLE)
    );
    const diagonalLimit = Math.sqrt(canvasWidth ** 2 + canvasHeight ** 2) / 800;
    const clock = new THREE.Clock();
    let lastRender = 0;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      if (now - lastRender < 16) {
        // Throttle to ~60fps
        return;
      }
      lastRender = now;
      const elapsed = clock.getElapsedTime();
  
      currentSpeed = lerp(currentSpeed, targetSpeed, 0.03);
      targetSpeed *= 0.85;
  
      for (const obj of objs) {
        obj.mesh.position.add(infiniteAxis.clone().multiplyScalar(currentSpeed * 0.001));
        obj.material.uniforms.uSpeed.value = currentSpeed * 0.01;
        obj.material.uniforms.uTime.value = elapsed;
  
        const wrapThreshold = diagonalLimit + PLANE_WIDTH * obj.mesh.scale.y;
        if (obj.mesh.position.y > wrapThreshold) {
          obj.mesh.position.y -= 2 * wrapThreshold;
          obj.mesh.position.x -= 2 * wrapThreshold * Math.sin(angleRad);
        } else if (obj.mesh.position.y < -wrapThreshold) {
          obj.mesh.position.y += 2 * wrapThreshold;
          obj.mesh.position.x += 2 * wrapThreshold * Math.sin(angleRad);
        }
      }
  
      renderer.render(scene, camera);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollTargetSpeed += e.deltaY * 0.4;
      targetSpeed = scrollTargetSpeed;
      scrollTargetSpeed *= 0.85;
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      for (const obj of objs) {
        obj.material.uniforms.uContainerResolution.value.set(w, h);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);

    const manager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(manager);

    manager.onLoad = () => {
      for (const obj of objs) {
        scene.add(obj.mesh);
      }
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animate();
      }
    };

    IMAGE_PATHS.forEach((path, index) => {
      loader.load(path, (texture) => {
        const image = texture.image as HTMLImageElement;
        if (!image || !image.naturalWidth) return;

        const ratio = image.naturalWidth / image.naturalHeight;
        const scaleY = PLANE_WIDTH * ratio;

        const material = new THREE.ShaderMaterial({
          side: THREE.DoubleSide,
          uniforms: {
            uTexture: { value: texture },
            uResolution: { value: new THREE.Vector2(image.naturalWidth, image.naturalHeight) },
            uContainerResolution: { value: new THREE.Vector2(canvasWidth, canvasHeight) },
            uUvScale: { value: new THREE.Vector2(1, 1) },
            uSpeed: { value: 0 },
            uTime: { value: 0 },
            uOverlayColor: { value: new THREE.Color(0.2, 0.1, 0) },
          },
          vertexShader,
          fragmentShader,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(PLANE_WIDTH, scaleY, 1);
        mesh.rotation.z = angleRad;

        const totalLength = IMAGE_PATHS.length * SPACING;
        const startOffset = -totalLength / 2;
        const yPos = startOffset + index * SPACING;
        mesh.position.set(Math.sin(angleRad) * yPos, Math.cos(angleRad) * yPos, 0);

        objs.push({ mesh, material });
      });
    });

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      id="carousel-canvas"
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
