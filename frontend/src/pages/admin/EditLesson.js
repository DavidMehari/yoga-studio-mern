import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLessonAdmin, updateLesson } from '../../helpers/utils';
import LessonForm from './LessonForm';

function EditLesson() {
  const [lessonToEdit, setLessonToEdit] = useState({});

  const { lessonId } = useParams();

  useEffect(() => {
    getLessonAdmin(lessonId).then((result) => setLessonToEdit(result.lesson));
  }, []);

  const submitAction = async (editedLesson) => {
    const result = await updateLesson(lessonId, editedLesson);
    return result;
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>

      <Typography variant="h2" align="center" component="h1" gutterBottom>
        Óra módosítása
      </Typography>

      <LessonForm submitAction={submitAction} lesson={lessonToEdit} />
    </Container>
  );
}

export default EditLesson;
