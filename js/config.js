window.WEDDING_CONFIG = {
  version: "2.8.1",

  site: {
    title: "Thiệp cưới Thành Đạt & Ngọc Diệp | 16.11.2026",
    description:
      "Trân trọng mời bạn đến chung vui trong lễ vu quy của Thành Đạt và Ngọc Diệp vào ngày 16/11/2026 tại 257 ấp Tân Hòa A, xã Tân Hiệp, tỉnh An Giang.",

    url: "https://dat-diep-wedding.vercel.app/",
    image: "",
  },

  couple: {
    groom: "Đạt",
    bride: "Diệp",
  },
  coupleName: {
    groom: "Thành Đạt",
    bride: "Ngọc Diệp",
  },

  loveStoryTitle: "Chuyện tình",
  loveStory:
    'Chẳng biết từ khi nào, những điều tình cờ đã trở thành quen thuộc, và một người xa lạ đã trở thành người thương. Sau 6 năm bên nhau, hôm nay chúng mình chọn nắm tay nhau bước vào một hành trình mới – <span class="story-highlight">hành trình mang tên gia đình</span>.',
  invitation:
    "Chúng mình rất hân hạnh khi được đón bạn đến chung vui trong lễ vu quy của hai đứa.",

  wedding: {
    day: "16",
    month: "11",
    year: "2026 ",
    time: "10:00",
    // Để trống "" nếu muốn website tự tính thứ từ ngày/tháng/năm.
    weekday: "Thứ hai",
    venueLabel: "Địa điểm",
    venue: "257 ấp tân hòa a, xã tân hiệp, tỉnh an giang",
    directions: "Chỉ đường",
    countdownTo: "2026-11-16T10:00:00+07:00",
    // mapUrl: "https://maps.app.goo.gl/yVmR2QHrD4ACBni57",
    mapUrl:
      "https://www.google.com/maps/place/10%C2%B007'43.0%22N+105%C2%B016'16.0%22E/@10.1286144,105.2711038,820m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d10.1286144!4d105.2711038?entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D",
  },

  families: {
    brideTitle: "Gia đình nhà gái",
    bride: ["Ông: Trần Thiện Sử", "Bà: Nguyễn Thị Cẩm Vân"],
    groomTitle: "Gia đình nhà trai",
    groom: ["Ông: Lê Thành Sang", "Bà: Phạm Thị Ngọc Diệu"],
  },

  calendar: {
    monthPrefix: "Tháng",
    weekdays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  },

  album: {
    first: "Album",
    second: "Ảnh cưới",
  },

  thankYouTitle: "Cảm ơn bạn!",
  thankYouText:
    "Chúng mình thật sự hạnh phúc khi có thể gửi đến bạn tấm thiệp cưới này.<br><br>Hy vọng sẽ được đón tiếp bạn trong ngày vui để cùng chia sẻ những khoảnh khắc đáng nhớ và gửi đến chúng mình những lời chúc tốt đẹp nhất.<br><br>Sự hiện diện của bạn là niềm vinh hạnh và là món quà ý nghĩa đối với hai đứa.",
  signoff: "Thân mến,",

  /*
    Ảnh để trống = giữ ảnh đang có sẵn trong index.html.
    Khi dùng ảnh local, chỉ cần điền đường dẫn. Ví dụ:
      cover: "assets/images/cover.webp"
      albumCover: "assets/images/album-cover.webp"
      gallery: ["assets/images/gallery-1.webp", ...]

    Gallery nếu để [] sẽ tự lấy các ảnh gallery có sẵn trong index.html.
  */
  images: {
    cover: "assets/images/cover.webp",
    invitation: "assets/images/invitation.webp",
    calendar: "",
    albumIntro: "",
    albumCover: "",
    gallery: [
      "assets/images/gallery-1.webp",
      "assets/images/gallery-2.webp",
      "assets/images/gallery-3.webp",
      "assets/images/gallery-4.webp",
      "assets/images/gallery-5.webp",
      "assets/images/gallery-6.webp",
      "assets/images/gallery-7.webp",
      "assets/images/gallery-8.webp",
      "assets/images/gallery-9.webp",
      "assets/images/gallery-11.webp",
      "assets/images/gallery-12.webp",
      "assets/images/gallery-13.webp",
      "assets/images/gallery-14.webp",
      "assets/images/gallery-15.webp",
      "assets/images/gallery-16.webp",
      "assets/images/gallery-17.webp",
      "assets/images/gallery-18.webp",
      "assets/images/gallery-19.webp",
      "assets/images/gallery-20.webp",
      "assets/images/gallery-21.webp",
      "assets/images/gallery-22.webp",
      "assets/images/gallery-23.webp",
      "assets/images/gallery-24.webp",
    ],
    footer: "",
    share: "",
  },

  music: {
    enabled: true,

    // Hiện dùng link nhạc cũ. Khi có file local, nên đổi thành:
    // track: "assets/audio/wedding.mp3",
    track: "https://files.catbox.moe/bcba42.mp3",

    // Có thể thêm file local làm dự phòng sau khi bạn chép MP3 vào project.
    fallbackTrack: "",
    volume: 0.65,
    loop: true,
    startOnFirstGesture: true,
  },
};
