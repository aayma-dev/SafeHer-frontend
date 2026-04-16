export const MOCK_REPORTS = [
  { 
    id:'1', 
    title:'Street Harassment Near Canal Road', 
    description:'A man followed me for 3 blocks making threatening comments near the canal bank.', 
    category:'harassment', 
    status:'verified', 
    created_at: new Date(Date.now()-3600000).toISOString(), 
    lat:31.5204, 
    lng:74.3587,
    image_url: '/src/assets/images/report-harassment.svg'
  },

  { 
    id:'2', 
    title:'Bag Snatching at Liberty Market', 
    description:'Two men on a motorcycle snatched my bag near the main entrance.', 
    category:'theft', 
    status:'verified', 
    created_at: new Date(Date.now()-7200000).toISOString(), 
    lat:31.5244, 
    lng:74.3527,
    image_url: '/src/assets/images/thef.jpeg'
  },

  { 
    id:'3', 
    title:'Very Poor Lighting on MM Alam Road', 
    description:'The entire stretch from Gaddafi Stadium to MM Alam has no working street lights at night.', 
    category:'lighting', 
    status:'pending', 
    created_at: new Date(Date.now()-10800000).toISOString(), 
    lat:31.5174, 
    lng:74.3617,
    image_url: '/src/assets/images/report-safety.svg'
  },

  { 
    id:'4', 
    title:'Being Followed from University', 
    description:'A man on foot followed me from LUMS gate to DHA Phase V. Very scary experience.', 
    category:'stalking', 
    status:'verified', 
    created_at: new Date(Date.now()-18000000).toISOString(), 
    lat:31.4697, 
    lng:74.4026,
    image_url: '/src/assets/images/stalking.png'
  },

  { 
    id:'5', 
    title:'Unsafe Gathering Near Park', 
    description:'Large group of men blocking the footpath near Jinnah Park, harassing women passersby.', 
    category:'unsafe_area', 
    status:'resolved', 
    created_at: new Date(Date.now()-86400000).toISOString(), 
    lat:31.5354, 
    lng:74.3757,
    image_url: '/src/assets/images/unsafe.jpeg'
  },

  { 
    id:'6', 
    title:'Assault Reported at Bus Stop', 
    description:'Physical altercation reported at the main bus stop on Ferozpur Road late at night.', 
    category:'assault', 
    status:'verified', 
    created_at: new Date(Date.now()-172800000).toISOString(), 
    lat:31.5104, 
    lng:74.3287,
    image_url: '/src/assets/images/report-alert.svg'
  },
];