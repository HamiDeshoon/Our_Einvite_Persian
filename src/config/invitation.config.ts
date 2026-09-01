export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon?: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  caption: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface InvitationConfig {
  groomName: string;
  brideName: string;
  familyInvitationText: string;
  welcomeText: string;
  gregorianDate: string; // ISO string for CountdownTimer
  persianDateText: string;
  weddingDayText: string;
  venueName: string;
  venueAddress: string;
  city: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectUrl: string;
  neshanDirectUrl?: string;
  baladDirectUrl?: string;
  videos: {
    heroBg: string;
    heroPoster: string;
    featuredVideo?: string;
  };
  images: {
    hero: string;
    storySection: string[];
    gallery: GalleryItem[];
    carousel: string[];
  };
  timeline: TimelineEvent[];
  contactPhone?: string;
}

export const invitationConfig: InvitationConfig = {
  groomName: 'حمید',
  brideName: 'فاطمه',
  familyInvitationText: 'با همیاری و شادمانی خانواده‌های گرامی',
  welcomeText: 'با کمال مسرت و شادمانی شما را به جشن پیوند آسمانی‌مان دعوت می‌نماییم',
  gregorianDate: '2026-08-13T18:00:00',
  persianDateText: 'پنج‌شنبه ۲۲ مرداد ۱۴۰۵ - ساعت ۱۸:۰۰',
  weddingDayText: 'پنج‌شنبه ۲۲ مرداد ۱۴۰۵',
  venueName: 'تالار پذیرایی شهدخت',
  venueAddress: 'تهران، احمدآباد مستوفی، خیابان صنوبر، پلاک ۱۲',
  city: 'تهران',
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3230.3416593875154!2d51.2096296603599!3d35.65860216138485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8df9007207f015%3A0xa4accfcab4fcd142!2z2KjYp9i6INi52YXYp9ix2Kog2LTYp9mH2K_Yrtiq!5e0!3m2!1sen!2s!4v1783141964584!5m2!1sen!2s',
  googleMapsDirectUrl:
    'https://www.google.com/maps/search/?api=1&query=35.658602%2C51.209630',
  neshanDirectUrl: 'https://nshn.ir/search',
  baladDirectUrl: 'https://balad.ir',
  videos: {
    heroBg: '/sub.mp4',
    heroPoster: '/poster.jpg',
    featuredVideo: '/sub.mp4',
  },
  images: {
    hero: '/poster.jpg',
    storySection: ['/poster.jpg'],
    carousel: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    ],
    gallery: [
      {
        id: 1,
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        caption: 'لحظات ماندگار خاطره‌ها',
        aspectRatio: 'landscape',
      },
      {
        id: 2,
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        caption: 'جشن و شادمانی در کنار عزیزان',
        aspectRatio: 'portrait',
      },
      {
        id: 3,
        src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        caption: 'آغاز یک مسیر زیبا',
        aspectRatio: 'square',
      },
    ],
  },
  timeline: [
    {
      time: '۱۸:۰۰',
      title: 'ورود مهمانان گرامی',
      description: 'استقبال از شما عزیزان و شروع مراسم با نوای گرم موسیقی',
    },
    {
      time: '۱۹:۳۰',
      title: 'مراسم خطبه عقد و پیمان عشق',
      description: 'قرائت خطبه عقد و سپردن دست‌های عهد و وفا',
    },
    {
      time: '۲۱:۰۰',
      title: 'پذیرایی شام و جشن شادمانی',
      description: 'صرف شام عالی و ادامه‌ی جشن و پایکوبی تا پاسی از شب',
    },
  ],
  contactPhone: '۰۹۱۲۰۰۰۰۰۰۰',
};
