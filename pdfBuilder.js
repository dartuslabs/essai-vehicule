
// Mock data
var input = {
  mainform: {
    endTime: "14:35",
    immatriculation: "B4CK2FUTU5E",
    modele: "Delorean",
    name: "Max Duluc",
    observation: "L'essai est bien plus long qu'il n'y parait mais c'est du a un vortex spacio temporel qui a tout foutu en l'air. Mais sinon ca va, j'essaye de rendre ce texte super long. Mais bon c'est pas l'endroit pour raconter sa vie non plus.",
    responsable: "Julien Duluc",
    startTime: "14:00"
  },
  meta: {
    fieldDate: '06/11/2018',
    fieldPlace: 'Auch'
  },
  drivingLicense: "data:image/jpeg;base64,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"
}

var insightMeta = {
  bnefLogoUrl: 'assets/bnef_logo.png',
  headerBgrUrl: 'assets/pdf_grid.png',
  copyright: 'Dartus Auch',
}





// Layout
l = {
  pageWidth: 210,
  pageHeight: 297,
  margin: 10,
  headerHeight: 28,
  footerHeight: 10,
  labelColWidth: 80
}

l.contentWidth = l.pageWidth - (l.margin * 2)

l.colOneWidth = 40;
l.colOneStart = l.margin;
l.colOneEnd   = l.colOneStart + l.colOneWidth;

l.colTwoStart = l.colOneEnd + l.margin;
l.colTwoEnd   = l.pageWidth - l.margin;
l.colTwoWidth = l.colTwoEnd - l.colTwoStart;


// Font styles
s = {
  title:      ['#111111', 'bold',   18],
  contrast:   ['#cccccc', 'normal', 12],
  content:    ['#222222', 'normal', 12],
  normal:     ['#555555', 'normal', 12],
  bottomline: ['#b7b7b7', 'normal', 7],
}





/**
 * pdfBuilder class
 * Generate one page PDF for client use.
 */
function pdfBuilder (data) {

  // Create the document
  this.doc = new jsPDF();
  this.data = data;
  this.img = {}

  this.onReady = this.loadDependencies()
    .then(() => this.fillContent())
    .catch(console.warn)
}

/**
 * Load the different required pictures and assets
 * to generate the document
 *
 * @return Promise Promise to be resolved once all items are loaded
 */
pdfBuilder.prototype.loadDependencies = function () {
  var fetchs = [
    this.loadImage('dartusLogo', 'assets/images/dartus_logo.png'),
    b64imageMetaExtractor(this.data.drivingLicense)
      .then(imgData  => this.img.drivingLicense = imgData)
  ];

  

  return Promise.all(fetchs)
}

/**
 * Load SVG, but it's not used
 */
pdfBuilder.prototype.loadSVG = function (url) {
  return fetch(url)
    .then(response => response.text());
}

/**
 * Load images and store them into the
 * `img` property of the imstance
 */
pdfBuilder.prototype.loadImage = function (imgName, url) {
  return fetch(url)
    .then(response => response.blob())
    .then(myBlob   => blobToB64(myBlob, url))
    .then(b64      => b64imageMetaExtractor(b64))
    .then(imgData  => this.img[imgName] = imgData);
}

/**
 * Setup the whole content
 */
pdfBuilder.prototype.fillContent = function () {
  this.fillPageOne();
  this.fillPageTwo();
  this.fillPageThree();
}

pdfBuilder.prototype.fillPageOne = function () {
  this.initPage();

  // Titre
  this.setFontStyle('title')
  this.doc.text(l.margin, this.contentStart, 'Information generales');
  this.contentStart += 14

  // Labels
  this.setFontStyle('normal');
  [
    'Nom du client',
    'Nom du responsable essai',
    'Modele',
    'Immatriculation',
    'Date',
    'Observations'
  ].forEach((label, index) => {
    this.doc.text(l.margin, this.contentStart + index * 10, label);
  });
  this.doc.text(l.margin, this.contentStart + 90, 'Permis de conduire');

  // Contenu
  let {mainform} = this.data
  this.setFontStyle('content');
  [
    mainform.name,
    mainform.responsable,
    mainform.modele,
    mainform.immatriculation,
    mainform.startTime + ' - ' + mainform.endTime,
    this.doc.splitTextToSize(mainform.observation || '-', l.contentWidth - l.labelColWidth)
  ].forEach((content, index) => {
    this.doc.text(l.margin + l.labelColWidth, this.contentStart + index * 10, content);
  });

  // Permis de conduire
  let img = this.img.drivingLicense,
      maxWidth = l.contentWidth,
      maxHeight = 100,
      width, height;

  if ((img.width / img.height) > (maxWidth / maxHeight)) {
    width = maxWidth
    height = img.height * (maxWidth / img.width)
  }
  else {
    width = img.width * (maxHeight / img.height)
    height = maxHeight
  }
  this.doc.addImage(img.data, 'JPEG', l.margin, this.contentStart + 98, width, height);	
}


pdfBuilder.prototype.fillPageTwo = function () {
  this.addPage();

  // Titre
  this.setFontStyle('title')
  this.doc.text(l.margin, this.contentStart, 'Declaration essai de vehicule');
  this.contentStart += 14

  // Content
  this.setFontStyle('content');
  const paragraphText = "Je déclare " + this.data.mainform.name + " avoir été informé(e) du fonctionnement et des conditions de conduite du véhicule. Je m'engage à conduire prudemment en respectant le code de la route et les limitations de vitesse. Je suis également informé(e) que le distributeur, en cas de réception d'un procès-verbal d'infraction, conformément aux dispositions légales (articles L121-6 et A121-1 à A121-3 du code de la route) doit communiquer aux autorités de police mon identité ainsi que mon adresse et les références de mon permis de conduire.";
  const splitParagraph = this.doc.splitTextToSize(paragraphText, l.contentWidth)
  this.doc.text(l.margin, this.contentStart, splitParagraph);
  this.contentStart += (6 * splitParagraph.length + 1);

  const meta = 'Fait a ' + this.data.meta.fieldPlace + ' le ' + this.data.meta.fieldDate
  this.doc.text(l.margin, this.contentStart, meta);
  this.contentStart += 10

  // Signature
  this.doc.addImage(fixImgDataType(this.data.signature, 'png'), 'PNG', l.margin, this.contentStart, 70, 40);	

}


pdfBuilder.prototype.fillPageThree = function () {
  this.addPage();

  // Titre
  this.setFontStyle('title')
  this.doc.text(l.margin, this.contentStart, 'Vos premières sensations');
  this.contentStart += 14

  // Feedback
  let d = this.data.feedback
  var labels = ['--', '-', '+', '++'];

  [
    [
      "Déroulement de l'essai", [
        ["Duree de l'essai", d.dureeEssai],
        ["Parcours de l'essai", d.parcoursEssai]
      ]
    ],
    [
      "Comportement du véhicule", [
        ["Qualité de conduite", d.qualiteConduite],
        ["Ergonomie des commandes", d.ergonomieCommandes],
        ["Confort de l'assise", d.confortAssise],
        ["Ergonomie de la boite de vitesse", d.ergonomieBoite]
      ]
    ],
    [
      "Accueil et sympathie du commercial", [
        ["Qualité d'accueil et du service", d.qualiteAccueil],
        ["Qualité des explications", d.qualiteExplication]
      ]
    ]  
  ].forEach(([label, questions]) => {
    this.doc.setFillColor(51, 51, 51)
    this.doc.rect(l.margin, this.contentStart, l.contentWidth, 8, 'F')

    this.setFontStyle('contrast')
    this.doc.text(l.margin + 3, this.contentStart + 5, label);
    labels.forEach((label, i) => {
      this.doc.text(l.margin + l.contentWidth - (4 - i) * 10, this.contentStart + 5, label);
    })
    this.contentStart += 9

    questions.forEach(([question, value]) => {
      this.setFontStyle('normal')
      this.doc.text(l.margin + 3, this.contentStart + 4, question);
      this.doc.text(l.margin + l.contentWidth - (4 - (labels.indexOf(value))) * 10, this.contentStart + 4, '×');
      this.contentStart += 6
    })
    this.contentStart += 2
  })
  this.contentStart += 10

  // Labels
  this.setFontStyle('normal');
  [
    'Votre projet d\'achat de vehicule',
    'Note de satisfaction de l\'essai'
  ].forEach((label, index) => {
    this.doc.text(l.margin, this.contentStart + index * 10, label);
  });

  // Contenu
  this.setFontStyle('content');
  [
    d.projetAchat,
    '' + d.satisfactionEssai + ' /10'
  ].forEach((content, index) => {
    this.doc.text(l.margin + l.labelColWidth, this.contentStart + index * 10, content);
  });

}


/**
 * Add a new page to the document
 * This will include header and footer
 *
 */
pdfBuilder.prototype.addPage = function () {

  this.doc.addPage('a4','p');
  this.initPage();
}

/**
 * Setup page by including header and footer
 *
 */
pdfBuilder.prototype.initPage = function () {

  this.addHeader();
  this.addFooter();
}

/**
 * Setup header in the current page
 *
 */
pdfBuilder.prototype.addHeader = function () {

  // Header background
  this.doc.setFillColor(238, 238, 238)
  this.doc.rect(0, 0, l.pageWidth, l.headerHeight, 'F')

  // Dartus logo
  var logoWidth = l.colOneWidth,
    logoHeight = logoWidth * this.img.dartusLogo.height / this.img.dartusLogo.width;
  this.doc.addImage(this.img.dartusLogo.data, 'JPEG', l.colOneStart, l.margin, logoWidth, logoHeight);

  // Header title
  var headerFontSize = this.setFontStyle('title')
  this.doc.text( 120, l.margin * 1.6, 'Essai vehicule');

  this.contentStart = l.headerHeight + l.margin * 1.5
};

/**
 * Setup footer in the current page
 *
 */
pdfBuilder.prototype.addFooter = function () {		
  let footerYstart = l.pageHeight - l.footerHeight
  this.setFontStyle('bottomline')

  this.doc.setFillColor(238, 238, 238)
  this.doc.rect(0, footerYstart, l.pageWidth, l.footerHeight, 'F')
  this.doc.text(l.colOneStart, footerYstart + l.margin/2, insightMeta.copyright);
};

/**
 * Set a font style from the predifined ones
 * then return the font size of the style set.
 *
 * @param styleName String Style to set
 * @return          Number Font size of the new style
 */
pdfBuilder.prototype.setFontStyle = function (styleName) {
  var style = s[styleName];
  if (!style) {
    return;
  }

  this.doc.setTextColor(style[0])
  this.doc.setFontStyle(style[1])
  this.doc.setFontSize(style[2])

  return style[2]
}

/**
 * Get the blob of the final PDF
 *
 * @return Blob Final output PDF
 */
pdfBuilder.prototype.getBlob = function () {
  return this.doc.output('blob')
}


/* Utils methods */

/**
 * Encode async a blob into a base64
 * via a Promise
 *
 * @param blob Blob            Blob to encode
 * @return     Promise<String> Promise
 */
function blobToB64 (blob, url) {
  
  return new Promise((resolve, reject) => {
    var reader = new window.FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
        base64data = reader.result;
                     
        resolve(fixImgDataType(base64data, url));
    }
  });
}

function fixImgDataType (b64, filename) {
  // Fix header for these fucking Safari
  if (!b64.startsWith('data:;')) {
    return b64;
  } 

  const split = filename.split('.'),
    type = split[split.length-1].toLowerCase();
  return 'data:image/' + type + ';' + b64.substr(6);
} 

/**
 * Extract meta data (width & height) from a
 * b64 encoded picture
 *
 * @param blob String          Base64 encoded picture
 * @return     Promise<Object> Promise
 */
function b64imageMetaExtractor (b64) {
  return new Promise((resolve, reject) => {
    var img = new Image();
      img.addEventListener('load', function () {
        resolve({
          width: img.width,
          height: img.height,
          data: b64
        })
      });
      img.src = b64;
  });
}





