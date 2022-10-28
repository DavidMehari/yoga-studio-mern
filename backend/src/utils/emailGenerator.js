export const emailGenerator = {

  getWelcomeMail(name) {
    return `
    <h1>Hello ${name},</h1>
    <h2>Thank you for joining Fusion Yoga Studio.</h2>
    <p>We'd like to confirm that your account was created successfully.</p>
    </br>
    Best regards,</br>
    <b>The Fusion Yoga Studio team</b>`;
  },

  getContactMail(name, title, email, message) {
    return `
 <h1>Message from - Fusion Yoga Studio Contact Form</h1>
 <h2>Message details</h2>
 </br>
 <p><b>From: </b>${name}, ${email}</p>
 <p><b>Title: </b>${title}</p>
 <p><b>Message: </b>${message}</p>
 </br>
 Contact form message from <b>Fusion Yoga Studio</b>`;
  },

  getBookingMail(booking) {
    return `
  <h1>Sikeres foglalás - Fusion Yoga Studio Contact Form</h1>
  <h2>${booking.lesson.type.name}</h2>
  </br>
  <p><b>${booking.user.name}</b></p>
  <p><b>Időpont: </b>${new Date(booking.lesson.start).toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' })}</p>
  <p><b>Fő: </b>${booking.numOfGuests} Fő</p>
  </br>
  <p>Köszönjük foglalását</p>
  <b>Fusion Yoga Studio</b>`;
  },

  getCancellationMail(booking) {
    return `
    <h1>Foglalás Lemondva - Fusion Yoga Studio Contact Form</h1>
    </br>
    <h2>Lemondott foglalás adatai:</h2>
    <p><b>${booking.user.name}</b></p>
    <p><b>${booking.lesson.type.name}</b></p>
    <p><b>Időpont: </b>${new Date(booking.lesson.start).toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' })}</p>
    <p><b>Fő: </b>${booking.numOfGuests} Fő</p>
    </br>
    <b>Fusion Yoga Studio</b>`;
  },

};
