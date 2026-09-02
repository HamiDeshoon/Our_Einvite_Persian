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
    sheetEndpoint: string;
  };
  contacts: {
    phone: string;
    displayPhone: string;
  };
  giftInfo: {
    title: string;
    formalNote: string;
    bankName: string;
    accountHolder: string;
    cardNumber: string;
    cardNumberFormatted: string;
    shabaNumber: string;
    shabaNumberFormatted: string;
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
        src: '/images/proposal_us.jpg',
        title: 'لحظه شیرین آغاز',
        caption: 'سپردن دست‌های مهر و وفا برای ساختن فردایی روشن و جاودانه',
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
    sheetEndpoint:
      import.meta.env.VITE_GOOGLE_SHEET_URL ||
      'https://script.google.com/macros/s/AKfycbydJo1ES-kazPBt5m9r2whrLL4F9h_igGd5T3fybgSk7S-m6_TJ-6ZvbTamiN3Bp3dt/exec',
  },
  contacts: {
    phone: '09120000000',
    displayPhone: '۰۹۱۲۰۰۰۰۰۰۰',
  },
  giftInfo: {
    title: 'هدیه و شادباش پیوند',
    formalNote:
      'حضور گرم و پرمهر شما در جشن پیوند آسمانی‌مان، ارزشمندترین و ماندگارترین هدیه‌ای است که آرزویش را داریم. برای سروران گرامی و دوستانی که جویای اطلاعات حساب جهت تقدیم هدیه و یادبود بودند، جزئیات حساب زیر با کمال احترام و سپاس تقدیم می‌گردد.',
    bankName: 'بانک سامان',
    accountHolder: 'سید حمید عقل مند صرمی',
    cardNumber: '6219861468533855',
    cardNumberFormatted: '۶۲۱۹ - ۸۶۱۴ - ۶۸۵۳ - ۳۸۵۵',
    shabaNumber: 'IR400560611828006036370101',
    shabaNumberFormatted: 'IR40 0560 6118 2800 6036 3701 01',
  },
};
