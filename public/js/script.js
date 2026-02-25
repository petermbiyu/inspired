$(document).ready(function () {
  $(".slider-wrapper").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: $(".next"),
    prevArrow: $(".prev"),
    dots: true,

    infinite: true,
    pauseOnHover: true,
    touchThreshold: 10,
    swipeToSlide: true,
    lazyLoad: "ondemand",
    speed: 300,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 810,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

// cdk editor

let editorInstance;

ClassicEditor.create(document.querySelector("#editor"), {
  toolbar: [
    "undo",
    "redo",
    "|",
    "heading",
    "|",
    "bold",
    "italic",
    "|",
    "bulletedList",
    "numberedList",
    "|",
    "link",
    "blockQuote",
    "|",
    "insertTable",
    "|",
    "mediaEmbed",
  ],
})
  .then((editor) => {
    editorInstance = editor;
    console.log("CKEditor initialized successfully");
  })
  .catch((error) => {
    console.error(error);
  });
