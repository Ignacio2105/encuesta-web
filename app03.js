function check() {
  const boxes = document.forms[0].elements;
  const allChecked = boxes[0].checked && boxes[1].checked && boxes[2].checked;

  if (allChecked) {
    if (!$('.wrapper').hasClass('throb')) {
      $('.wrapper').addClass('throb');
    }
  } else {
    $('.wrapper').removeClass('throb');
  }
}
