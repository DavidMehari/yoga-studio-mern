import jwt from 'jsonwebtoken';

export const getDataFromToken = (token) => {
  return jwt.decode(token);
};

export function isEmptyObj(obj) {
  return JSON.stringify(obj) === '{}';
}

export const registerNewUser = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Regisztráció sikertelen.',
    };
    return result;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Bejelentkezés sikertelen.',
    };
    return result;
  }
};

export const loginWithGoogle = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/login-google`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Bejelentkezés sikertelen.',
    };
    return result;
  }
};

export const bookLesson = async (userId, lessonId, numOfGuests) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/bookings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({
          userId,
          lessonId,
          numOfGuests,
        }),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Foglalás sikertelen.',
    };
    return result;
  }
};

export const sendContactMessage = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Network error. Message not sent!',
    };
    return result;
  }
};

export const addNewLesson = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/classes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify(formData),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Üzenet küldése sikertelen.',
    };
    return result;
  }
};

export const addNewLessonType = async (lessonTypeData, featuredImage) => {
  const formData = new FormData();

  Object.keys(lessonTypeData).forEach((key) => formData.append(key, lessonTypeData[key]));

  formData.append('featuredImage', featuredImage);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/lesson-types`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: formData,
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Üzenet küldése sikertelen.',
    };
    return result;
  }
};

export const updateLesson = async (lessonId, formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/classes/${lessonId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify(formData),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Óra módosítása sikertelen.',
    };
    return result;
  }
};

export const getLesson = async (lessonId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/classes/${lessonId}`,
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Lekérdezés sikertelen.',
    };
    return result;
  }
};

export const getLessonAdmin = async (lessonId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/classes/${lessonId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Lekérdezés sikertelen.',
    };
    return result;
  }
};

export const deleteLesson = async (lessonId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/classes/${lessonId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Óra törlése sikertelen.',
    };
    return result;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/bookings/cancel/${bookingId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Óra lemondása sikertelen.',
    };
    return result;
  }
};

export const editBooking = async (bookingId, bookingData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/bookings/edit/${bookingId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify(bookingData),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Óra módosítása sikertelen.',
    };
    return result;
  }
};

export const getAllLessons = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/classes`,
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Lekérdezés sikertelen.',
    };
    return result;
  }
};

export const getAllLessonsAdmin = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/lessons/all`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Lekérdezés sikertelen.',
    };
    return result;
  }
};

export const getMyBookings = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/bookings`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Lekérdezés sikertelen.',
    };
    return result;
  }
};

export const getAllBookings = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/bookings/all`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Lekérdezés sikertelen.',
    };
    return result;
  }
};

export const getAllInstructorNames = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/instructors`,
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Lekérdezés sikertelen.',
    };
    return result;
  }
};

export const getAllLessonTypes = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/lesson-types`,
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Lekérdezés sikertelen.',
    };
    return result;
  }
};

export const getTickets = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/api/tickets`,
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message: 'Hálózati hiba. Lekérdezés sikertelen.',
    };
    return result;
  }
};
