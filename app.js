var mainForm = document.querySelectorAll('#mainForm .inline-field-input'),
    drivingLicense = document.getElementById('drivingLicense'),
    nameField = document.getElementById('nameField'),
    fieldPlace = document.getElementById('fieldPlace'),
    fieldDate = document.getElementById('fieldDate');

var drivingLicensePicture,
signaturePad;

function init() {

  // Store DOMs
  drivingLicense.onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        drivingLicensePicture = fr.result;
      }
      fr.readAsDataURL(files[0]);
    }

    // Not supported
    else {
        // fallback -- perhaps submit the input to an iframe and temporarily store
        // them on the server until the user's session ends.
    }
}

  // Setup stuff
  var now = new Date();
  fieldPlace.value = 'Auch';
  fieldDate.value = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`

  var canvas = document.querySelector("canvas");
  var ratio =  Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);

  signaturePad = new SignaturePad(canvas, {
    penColor: "rgb(255,255,255)"
  });
  signaturePad.on()

}

init()






var pageOneForm;

function validateStep (step) {
  switch (step) {
    case 1:
      pageOneForm = getValuesFromFieldList(mainForm)
      nameField.textContent = pageOneForm.name
      break;

    case 2:
      var fields = document.querySelectorAll('#page2 input')
      pageTwoForm = getValuesFromFieldList(fields)

      if(signaturePad.isEmpty()) {
        alert('Votre signature est obligatoire')
        return;
      }
      signature = signaturePad.toDataURL("image/svg+xml");
      break;

    case 3:
      
      break;
  }
}


var getValuesFromFieldList = function (fieldList) {
  var options = {};
  forEach(fieldList, function (index, el) {
    if (el.type === 'radio' && !el.checked) {
      return;
    }
    else if (el.type === 'checkbox') {
      options[el.name] = el.checked;
    }
    else if (el.value) {
      options[el.name] = el.value;
    }
  });
  return options;
};

var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};