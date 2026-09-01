/**
 * ==========================================================================
 * Hamid & Fatemeh Wedding Invitation — Production Configuration
 * ==========================================================================
 */

export interface ScheduleItem {
  time: string;
  timeFa: string;
  title: string;
  description: string;
  icon?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
}

export interface StoryChapter {
  year: string;
  title: string;
  content: string;
}

export interface InvitationConfig {
  couple: {
    groom: string;
    bride: string;
    groomEn: string;
    brideEn: string;
    familyInvitationText: string;
    welcomeText: string;
    monogramFa: string;
    monogramEn: string;
  };
  event: {
    targetIsoDate: string;
    persianDateText: string;
    weddingDayText: string;
    timeText: string;
    venueName: string;
    venueAddress: string;
    city: string;
  };
  navigation: {
    googleMapsEmbedUrl: string;
    googleMapsDirectUrl: string;
    neshanDirectUrl: string;
    baladDirectUrl: string;
    appleMapsDirectUrl: string;
  };
  media: {
    heroPoster: string;
    storyImage: string;
    audioTrack: string;
    audioTitle?: string;
    gallery: GalleryItem[];
  };
  story: {
    quote: string;
    quotePoet: string;
    description: string;
  };
  schedule: ScheduleItem[];
  rsvp: {
    deadlineText: string;
    maxGuestsPerSubmission: number;
  };
  contacts: {
    phone: string;
    displayPhone: string;
  };
}

export const invitationConfig: InvitationConfig = {
  couple: {
    groom: 'حمید',
    bride: 'فاطمه',
    groomEn: 'Hamid',
    brideEn: 'Fatemeh',
    familyInvitationText: 'با همراهی و شادمانی خانواده‌های گرامی',
    welcomeText: 'با کمال مسرت و شادمانی، شما را به جشن پیوند آسمانی و آغاز زندگی مشترکمان دعوت می‌نماییم',
    monogramFa: 'ح & ف',
    monogramEn: 'H & F',
  },
  event: {
    targetIsoDate: '2026-09-12T19:00:00+03:30',
    persianDateText: 'شنبه ۲۱ شهریور ۱۴۰۵',
    weddingDayText: 'شنبه ۲۱ شهریور ۱۴۰۵',
    timeText: 'ساعت ۱۹:۰۰ (۷ عصر)',
    venueName: 'تالار پذیرایی یاسین قم',
    venueAddress: 'قم، باجک دو، بلوار زائر (بلوار شهید قاسم سلیمانی)، کنار‌گذر بلوار زائر',
    city: 'قم',
  },
  navigation: {
    googleMapsEmbedUrl:
      'https://maps.google.com/maps?q=34.665741,50.905739&hl=fa&z=16&output=embed',
    googleMapsDirectUrl:
      'https://www.google.com/maps/search/?api=1&query=34.665741%2C50.905739',
    neshanDirectUrl: 'https://nshn.ir/1c_bsiVOPxvD-a',
    baladDirectUrl: 'https://balad.ir/p/70nwBuvxylRcUA',
    appleMapsDirectUrl:
      'https://maps.apple.com/?ll=34.665741,50.905739&q=%D8%AA%D8%A7%D9%84%D8%A7%D8%B1%20%D9%BE%D8%B0%DB%8C%D8%B1%D8%A7%DB%8C%DB%8C%20%DB%8C%D8%A7%D8%B3%DB%8C%D9%86%20%D9%82%D9%85',
  },
  media: {
    heroPoster: '/images/Intivation_pose.jpg',
    storyImage: '/images/proposal_us.jpg',
    audioTrack: '/la-maritza-piano.mp3',
    audioTitle: 'نوای دلنشین پیانو (La Maritza)',
    gallery: [
      {
        id: '1',
        src: '/images/Intivation_pose.jpg',
        title: 'عهد و پیمان عاشقی',
        caption: 'آغاز سرسبزترین فصل با هم بودن و پیوند آسمانی‌مان',
      },
      {
        id: '2',
        src: '/images/proposal_us.jpg',
        title: 'لحظه شیرین آغاز',
        caption: 'سپردن دست‌های مهر و وفا برای ساختن فردایی روشن',
      },
    ],
  },
  story: {
    quote: '«در نگاهت عشق می‌خوانم، در صدایت زندگی / با تو بودن تا ابد زیباترین دلدادگی»',
    quotePoet: '— پیوند مهر حمید و فاطمه',
    description:
      'خداوند مهربان را شاکریم که دل‌های ما را با عطر محبت و همدلی پیوند داد. مفتخریم که در این ضیافت پر از شادمانی، نگاه پرمهر شما عزیزان و همراهان همیشگی را در کنار خویش داشته باشیم.',
  },
  schedule: [
    {
      time: '۱۹:۰۰',
      timeFa: 'ساعت ۱۹:۰۰',
      title: 'ورود و استقبال از مهمانان گرامی',
      description: 'استقبال گرم، ثبت یادگاری و نوای دلنشین موسیقی در آغاز جشن',
      icon: 'sparkles',
    },
    {
      time: '۲۰:۱۵',
      timeFa: 'ساعت ۲۰:۱۵',
      title: 'مراسم باشکوه عقد و پیمان عشق',
      description: 'قرائت خطبه عقد آسمانی و جاری شدن آرزوهای نیک',
      icon: 'heart',
    },
    {
      time: '۲۱:۳۰',
      timeFa: 'ساعت ۲۱:۳۰',
      title: 'ضیافت شام و ادامه جشن و پایکوبی',
      description: 'صرف شام عالی و ادامه‌ی شادمانی و خاطره‌سازی تا پاسی از شب',
      icon: 'utensils',
    },
  ],
  rsvp: {
    deadlineText: 'لطفاً تا تاریخ ۱۸ شهریور حضور گرمتان را اعلام فرمایید',
    maxGuestsPerSubmission: 5,
  },
  contacts: {
    phone: '09120000000',
    displayPhone: '۰۹۱۲۰۰۰۰۰۰۰',
  },
};
