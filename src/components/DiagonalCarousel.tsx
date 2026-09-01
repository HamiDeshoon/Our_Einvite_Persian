import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../shaders/carouselShaders';
import { asset } from '../lib/assets';

const IMAGE_PATHS = [
  asset('/images/Mirror_duo.jpg'),
  asset('/images/Elevator_duo.jpg'),
  asset('/images/Gang_pose_duo.jpg'),
  asset('/images/Selfie_hamid_view.jpg'),
  asset('/images/Selfie_fatemeh_view.jpg'),
  asset('/images/proposal_us.jpg'),
  asset('/images/Intivation_pose.jpg'),
  asset('/images/North_trip.jpg'),
  asset('/images/First_trip.jpg'),
  asset('/images/Kebab_trio.jpg'),
  asset('/images/Wedding_flowers.jpg'),
  asset('/images/Wedding_ring.jpg'),
  asset('/images/Fatemeh_childhood.jpg'),
  asset('/images/Hamid_defending_thesis.jpg'),
  asset('/images/Graduation.jpg'),
  asset('/images/Graduation_party.jpg'),
  asset('/images/our_childhood.jpg'),
];

const VIDEO_PATH = asset('/sub.mp4');

const PLANE_WIDTH = 0.35;
const DIAGONAL_ANGLE = 35;
const SPACING = 0.5;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default function DiagonalCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const angleRad = (Math.PI * DIAGONAL_ANGLE) / 180;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1000, 1000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
    const objs: { mesh: THREE.Mesh; material: THREE.ShaderMaterial; type?: string }[] = [];

    let currentSpeed = 0;
    let targetSpeed = 0;
    let scrollTargetSpeed = 0;
    let animFrameId: number;
    let timeOffset = 0;

    const infiniteAxis = new THREE.Vector3(0, 1, 0).applyAxisAngle(
      new THREE.Vector3(0, 0, 1),
      THREE.MathUtils.degToRad(DIAGONAL_ANGLE)
    );
    const diagonalLimit = Math.sqrt(canvasWidth ** 2 + canvasHeight ** 2) / 600;
    let lastRender = 0;

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      for (const obj of objs) {
        obj.material.uniforms.uContainerResolution.value.set(w, h);
      }
    };

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      if (now - lastRender < 16) return;
      lastRender = now;

      currentSpeed = lerp(currentSpeed, targetSpeed, 0.025);
      targetSpeed *= 0.85;
      timeOffset += 0.005;

      for (const obj of objs) {
        const speedFactor = currentSpeed * 0.001;
        obj.mesh.position.add(infiniteAxis.clone().multiplyScalar(speedFactor));
        obj.material.uniforms.uSpeed.value = Math.abs(currentSpeed) * 0.015;
        obj.material.uniforms.uTime.value = timeOffset;

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
      scrollTargetSpeed += e.deltaY * 0.3;
      targetSpeed = scrollTargetSpeed;
      scrollTargetSpeed *= 0.85;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);

    const manager = new THREE.LoadingManager();

    manager.onLoad = () => {
      for (const obj of objs) {
        scene.add(obj.mesh);
      }
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animate();
      }
    };

    // Load video texture
    const video = document.createElement('video');
    video.src = VIDEO_PATH;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.preload = 'auto';
    videoRef.current = video;

    video.addEventListener('loadedmetadata', () => {
      video.play().catch(() => {});
      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBAFormat;

      const material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: {
          uTexture: { value: videoTexture },
          uResolution: { value: new THREE.Vector2(video.videoWidth, video.videoHeight) },
          uContainerResolution: { value: new THREE.Vector2(canvasWidth, canvasHeight) },
          uUvScale: { value: new THREE.Vector2(1, 1) },
          uSpeed: { value: 0 },
          uTime: { value: 0 },
          uOverlayColor: { value: new THREE.Color(0.1, 0.05, 0.03) },
        },
        vertexShader,
        fragmentShader,
      });

      const mesh = new THREE.Mesh(geometry, material);
      const scaleY = PLANE_WIDTH * (video.videoWidth / video.videoHeight);
      mesh.scale.set(PLANE_WIDTH, scaleY, 1);
      mesh.rotation.z = angleRad;

      const totalLength = (IMAGE_PATHS.length + 1) * SPACING;
      const startOffset = -totalLength / 2;
      const yPos = startOffset - SPACING;
      mesh.position.set(Math.sin(angleRad) * yPos, Math.cos(angleRad) * yPos, 0);

      objs.push({ mesh, material, type: 'video' });
    });

    // Load image textures
    IMAGE_PATHS.forEach((path, index) => {
      const loader = new THREE.TextureLoader(manager);
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
            uOverlayColor: { value: new THREE.Color(0.1, 0.05, 0.03) },
          },
          vertexShader,
          fragmentShader,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(PLANE_WIDTH, scaleY, 1);
        mesh.rotation.z = angleRad;

        const totalLength = (IMAGE_PATHS.length + 1) * SPACING;
        const startOffset = -totalLength / 2;
        const yPos = startOffset + index * SPACING;
        mesh.position.set(Math.sin(angleRad) * yPos, Math.cos(angleRad) * yPos, 0);

        objs.push({ mesh, material, type: 'image' });
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
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.remove();
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
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}