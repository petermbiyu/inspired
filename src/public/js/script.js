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

document.addEventListener("DOMContentLoaded", () => {
  tinymce.init({
    selector: ".editor",
    height: 500,
    license_key: "gpl",
    menubar: false,

    // Add this setup function
    setup: function (editor) {
      editor.on("init", function () {
        console.log("Editor initialized:", editor.id);
        // You could trigger a custom event here
        document.dispatchEvent(
          new CustomEvent("tinymce-initialized", {
            detail: { editorId: editor.id },
          }),
        );
      });
    },

    plugins: [
      "lists",
      "link",
      "image",
      "table",
      "code",
      "media",
      "preview",
      "wordcount",
      "codesample",
    ],

    toolbar:
      "undo redo | blocks | " +
      "bold italic underline strikethrough | " +
      "bullist numlist blockquote | " +
      "link image media table codesample | " +
      "removeformat | preview code",

    block_formats: "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3",

    content_style: `
      body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        padding: 10px;
      }
      h1 { font-size: 28px; }
      h2 { font-size: 24px; }
      h3 { font-size: 20px; }
        `,
  });
});
