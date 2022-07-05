import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LessonItemAdmin from '../../components/admin/LessonItemAdmin';
import { getAllLessonsAdmin } from '../../helpers/utils';

function AllLessons() {
  // eslint-disable-next-line no-unused-vars
  const [allLessons, setAllLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);

  const refreshData = async () => {
    const result = await getAllLessonsAdmin();
    if (result.status === 200) {
      setAllLessons(result.lessons);
      setFilteredLessons(result.lessons);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box component="div" display="flex" flexDirection="column" alignItems="center">
        <Typography
          variant="h2"
          fontWeight="200"
          align="center"
          component="div"
          gutterBottom
        >
          Órák
        </Typography>

        <Box
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          {filteredLessons.map((lesson) => (
            <LessonItemAdmin
              key={lesson._id}
              lesson={lesson}
              refreshData={refreshData}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default AllLessons;
