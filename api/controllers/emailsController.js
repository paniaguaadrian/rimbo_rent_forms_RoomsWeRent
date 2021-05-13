import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import hbs from "nodemailer-express-handlebars";

// * Rimbo rent emails
// Production / Development
const rimboEmail = "info@rimbo.rent";
const ukioEmail = "partners@stayukio.com";
// const rimboEmail = "victor@rimbo.rent";
// const ukioEmail = "victor@rimbo.rent";
// const rimboEmail = "paniaguasanchezadrian@gmail.com";
// const ukioEmail = "paniaguasanchezadrian@gmail.com";

// ? =======>  SPANISH VERSION START ==============================>
// ! F1SC Form => E1R (email to Rimbo) E1SC (email to Ukio)
const sendF1SCFormEmails = async (req, res) => {
  const {
    agencyName,
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    acceptanceCriteria,
    rentStartDate,
    rentEndDate,
    product,
    tenancyID,
    rentalAddress,
    room,
  } = req.body;

  const transporterE1R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterE1SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE1R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1REmail",
    },
    viewPath: "views/",
  };

  let optionsE1SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1SCEmail",
    },
    viewPath: "views/",
  };

  transporterE1R.use("compile", hbs(optionsE1R));
  transporterE1SC.use("compile", hbs(optionsE1SC));

  const RimboEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `Nuevo inquilino registrado por ${agencyName}`,
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
    ],
    template: "E1REmail",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      acceptanceCriteria,
      rentStartDate,
      rentEndDate,
      product,
      tenancyID,
      rentalAddress,
      room,
    },
  };

  const UkioEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: ukioEmail, // Ukio Email
    subject: "Registro de inquilino correcto",
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
    ],
    template: "E1SCEmail",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      acceptanceCriteria,
      rentStartDate,
      rentEndDate,
      product,
      tenancyID,
      rentalAddress,
      room,
    },
  };

  transporterE1R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE1SC.sendMail(UkioEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! E1R Email => E2TT (email to Tenant)
const sendE1REmailEmails = async (req, res) => {
  const {
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    randomID,
    agencyName,
    rentalAddress,
    room,
    tenancyID,
    rentStartDate,
    rentEndDate,
  } = req.body;

  const transporterE2TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2TTEmail",
    },
    viewPath: "views/",
  };

  transporterE2TT.use("compile", hbs(optionsE2TT));

  const TenantEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: tenantsEmail, // tenants Email
    subject:
      "Bienvenido a la revolución de los depósitos - Welcome to the deposit revolution",
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
    ],
    template: "E2TTEmail",
    context: {
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      randomID,
      agencyName,
      rentalAddress,
      room,
      tenancyID,
      rentStartDate,
      rentEndDate,
    },
  };

  transporterE2TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2SC Form => E2R (email to Rimbo that informs tenant is on F2SC)
const sendNotificationRimbo = async (req, res) => {
  const {
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    agencyName,
    randomID,
  } = req.body;

  const transporterE2R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2REmail",
    },
    viewPath: "views/",
  };

  transporterE2R.use("compile", hbs(optionsE2R));

  const RimboEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `${agencyName}-${tenantsFirstName} ${tenantsLastName}-Registration Start`,
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
    ],
    template: "E2REmail",
    context: {
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      agencyName,
      randomID,
    },
  };

  transporterE2R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2SC Form => E3 (Rimbo, tenant, Ukio)
const sendF2SCFormEmails = async (req, res) => {
  const {
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    agencyName,
    rentalAddress,
    rentStartDate,
    rentEndDate,
  } = req.body;

  const transporterE3R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  let optionsE3R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3REmail",
    },
    viewPath: "views/",
  };
  let optionsE3TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3TTEmail",
    },
    viewPath: "views/",
  };
  let optionsE3SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3SCEmail",
    },
    viewPath: "views/",
  };

  transporterE3R.use("compile", hbs(optionsE3R));
  transporterE3TT.use("compile", hbs(optionsE3TT));
  transporterE3SC.use("compile", hbs(optionsE3SC));

  // Rimbo Email
  const RimboEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `${tenantsFirstName} ${tenantsLastName} Tarjeta registrada correctamente`,
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
    ],
    template: "E3REmail",
    context: {
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      agencyName,
      rentalAddress,
      rentStartDate,
      rentEndDate,
    },
  };
  // Tenant Email
  const TenantEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant Email
    subject: `Bienvenido a ${agencyName} & Rimbo`,
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
      {
        filename: "Reglas_Generales_y_Guia_Inquilino_Rimbo.pdf",
        path: "./views/images/Reglas_Generales_y_Guia_Inquilino_Rimbo.pdf",
      },
    ],
    template: "E3TTEmail",
    context: {
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      agencyName,
      rentalAddress,
      rentStartDate,
      rentEndDate,
    },
  };
  // Ukio Email
  const SCEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: ukioEmail, // Ukio Email
    subject: `${tenantsFirstName} ${tenantsLastName} Tarjeta registrada correctamente`,
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
    ],
    template: "E3SCEmail",
    context: {
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      agencyName,
      rentalAddress,
      rentStartDate,
      rentEndDate,
    },
  };

  transporterE3R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3SC.sendMail(SCEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};
// ? =======>  SPANISH VERSION END ==============================>
////////////////////////////////////////////////////////////////
// ? =======>  ENGLISH VERSION START ==============================>
// ! F1SC Form => E1R
const sendF1SCFormEmailsEn = async (req, res) => {
  const {
    agencyName,
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    acceptanceCriteria,
    rentStartDate,
    rentEndDate,
    product,
    tenancyID,
    rentalAddress,
    room,
  } = req.body;

  const transporterE1R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterE1SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE1R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1REmailEn",
    },
    viewPath: "views/",
  };

  let optionsE1SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1SCEmailEn",
    },
    viewPath: "views/",
  };

  transporterE1R.use("compile", hbs(optionsE1R));
  transporterE1SC.use("compile", hbs(optionsE1SC));

  const RimboEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `New Tenant Listing by ${agencyName}`,
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
    ],
    template: "E1REmailEn",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      acceptanceCriteria,
      rentStartDate,
      rentEndDate,
      product,
      tenancyID,
      rentalAddress,
      room,
    },
  };

  const UkioEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: ukioEmail, // Ukio Email
    subject: "Tenant successfully registered",
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
    ],
    template: "E1SCEmailEn",
    context: {
      agencyName,
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      acceptanceCriteria,
      rentStartDate,
      rentEndDate,
      product,
      tenancyID,
      rentalAddress,
      room,
    },
  };

  transporterE1R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE1SC.sendMail(UkioEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! E1R Email => E2TT (email to Tenant)
const sendE1REmailEmailsEn = async (req, res) => {
  const {
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    randomID,
    agencyName,
    rentalAddress,
    room,
    tenancyID,
    rentStartDate,
    rentEndDate,
  } = req.body;

  const transporterE2TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2TTEmailEn",
    },
    viewPath: "views/",
  };

  transporterE2TT.use("compile", hbs(optionsE2TT));

  const TenantEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenants Email
    subject: "Welcome to the deposit revolution",
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
    ],
    template: "E2TTEmailEn",
    context: {
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      randomID,
      agencyName,
      rentalAddress,
      room,
      tenancyID,
      rentStartDate,
      rentEndDate,
    },
  };

  transporterE2TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2SC Form => E2R (email to Rimbo that informs tenant is on F2SC)
const sendNotificationRimboEn = async (req, res) => {
  const {
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    tenantsPhone,
    agencyName,
    randomID,
  } = req.body;

  const transporterE2R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2REmailEn",
    },
    viewPath: "views/",
  };

  transporterE2R.use("compile", hbs(optionsE2R));

  const RimboEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `${agencyName}-${tenantsFirstName} ${tenantsLastName}-Registration Start`,
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
    ],
    template: "E2REmailEn",
    context: {
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      tenantsPhone,
      agencyName,
      randomID,
    },
  };

  transporterE2R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2SC Form => E3 (Rimbo, tenant, Ukio)
const sendF2SCFormEmailsEn = async (req, res) => {
  const {
    tenantsFirstName,
    tenantsLastName,
    tenantsEmail,
    agencyName,
    rentalAddress,
    rentStartDate,
    rentEndDate,
  } = req.body;

  const transporterE3R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  let optionsE3R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3REmailEn",
    },
    viewPath: "views/",
  };
  let optionsE3TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3TTEmailEn",
    },
    viewPath: "views/",
  };
  let optionsE3SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3SCEmailEn",
    },
    viewPath: "views/",
  };

  transporterE3R.use("compile", hbs(optionsE3R));
  transporterE3TT.use("compile", hbs(optionsE3TT));
  transporterE3SC.use("compile", hbs(optionsE3SC));

  // Rimbo Email
  const RimboEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `${tenantsFirstName} ${tenantsLastName} Card successfully registered`,
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
    ],
    template: "E3REmailEn",
    context: {
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      agencyName,
      rentalAddress,
      rentStartDate,
      rentEndDate,
    },
  };
  // Tenant Email
  const TenantEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant Email
    subject: `Welcome to ${agencyName} & Rimbo`,
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
      {
        filename: "General_Rules_and_Guidelines_Tenant_Rimbo.pdf",
        path: "./views/images/General_Rules_and_Guidelines_Tenant_Rimbo.pdf",
      },
    ],
    template: "E3TTEmailEn",
    context: {
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      agencyName,
      rentalAddress,
      rentStartDate,
      rentEndDate,
    },
  };
  // Ukio Email
  const SCEmail = {
    from: "Ukio & Rimbo info@rimbo.rent",
    to: ukioEmail, // Ukio Email
    subject: `${tenantsFirstName} ${tenantsLastName} Card successfully registered`,
    attachments: [
      {
        filename: "ukio_logo.jpeg",
        path: "./views/images/ukio_logo.jpeg",
        cid: "ukiologo",
      },
    ],
    template: "E3SCEmailEn",
    context: {
      tenantsFirstName,
      tenantsLastName,
      tenantsEmail,
      agencyName,
      rentalAddress,
      rentStartDate,
      rentEndDate,
    },
  };

  transporterE3R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3SC.sendMail(SCEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};
// ? =======> ENGLISH VERSION END ==============================>

export {
  sendF1SCFormEmails,
  sendE1REmailEmails,
  sendNotificationRimbo,
  sendF2SCFormEmails,
  sendF1SCFormEmailsEn,
  sendE1REmailEmailsEn,
  sendNotificationRimboEn,
  sendF2SCFormEmailsEn,
};
