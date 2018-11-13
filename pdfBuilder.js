

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
  let {mainform, feedback} = this.data
  this.setFontStyle('content');
  [
    mainform.name,
    mainform.responsable,
    mainform.modele,
    mainform.immatriculation,
    feedback.startTime + ' - ' + feedback.endTime,
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
  this.doc.text(l.colOneStart, footerYstart + l.margin/2, 'Dartus Auch');
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





