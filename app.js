var store = {},
    outputFilename = 'EV_',
    signaturePad, myPDF;

var mainForm = document.querySelectorAll('#mainForm .inline-field-input'),
    drivingLicense = document.getElementById('drivingLicense'),
    nameField = document.getElementById('nameField'),
    fieldPlace = document.getElementById('fieldPlace'),
    fieldDate = document.getElementById('fieldDate'),
    downloadAnchor = document.getElementById('downloadAnchor'),
    startTime = document.getElementById('startTime'),
    endTime = document.getElementById('endTime');


// Page one
// Driving license
drivingLicense.onchange = function (evt) {
  var tgt = evt.target || window.event.srcElement,
      files = tgt.files;

  // FileReader support
  if (FileReader && files && files.length) {
    var fr = new FileReader();
    fr.onload = function () {
      store.drivingLicense = fr.result;
    }
    fr.readAsDataURL(files[0]);
  }
}

// Page 2
// Setup input fields
var now = new Date();
fieldPlace.value = 'Auch';
fieldDate.value = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
outputFilename += `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}_`;

// Init signature pad
var canvas = document.querySelector("canvas");
var ratio =  Math.max(window.devicePixelRatio || 1, 1);
canvas.width = canvas.offsetWidth * ratio;
canvas.height = canvas.offsetHeight * ratio;
canvas.getContext("2d").scale(ratio, ratio);

signaturePad = new SignaturePad(canvas);
signaturePad.on()

// Page 4
startTime.value = getTime();


// Hide pages
document.getElementById('page2').style.display = 'none';
document.getElementById('page3').style.display = 'none';
document.getElementById('page4').style.display = 'none';
document.getElementById('page5').style.display = 'none';






function validateStep (step) {
  var fields
  
  switch (step) {
    case 1:
      fields = document.querySelectorAll('#page1 input, #page1 textarea');
      store.mainform = getValuesFromFieldList(fields);
      nameField.textContent = store.mainform.name;
      outputFilename += store.mainform.name;
      break;

    case 2:
      fields = document.querySelectorAll('#page2 input')
      store.meta = getValuesFromFieldList(fields)

      if(signaturePad.isEmpty()) {
        alert('Votre signature est obligatoire')
        return;
      }
      store.signature = signaturePad.toDataURL("image/png");
      break;

    case 3:
      endTime.value = getTime();
      break;

    case 4:
      fields = document.querySelectorAll('#page4 input')
      store.feedback = getValuesFromFieldList(fields)
      store.filename = outputFilename;
      myPDF = new pdfBuilder(store);
      myPDF.onReady.then(() => {
        var url = window.URL.createObjectURL(myPDF.doc.output('blob'));
        downloadAnchor.href = url;
        downloadAnchor.download = outputFilename + '.pdf';
        downloadAnchor.style.opacity = 1;
      })
      break;
  }

  // Reveal and scroll
  let nextPage = document.getElementById('page' + (step+1))
  nextPage.style.display = 'inherit';
  smoothScrollTo(nextPage)
}


function getValuesFromFieldList (fieldList) {
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

function forEach (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};

function getTime () {
  var now = new Date();
  return now.getHours() + ':' + pad(now.getMinutes())
}

function pad (num) {
  if (num < 10) {
    return '0' + num;
  }
  else {
    return num
  }
}