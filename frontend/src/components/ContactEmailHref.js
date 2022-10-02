import { Link, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

function ContactEmailHref() {
  return (
    <Typography
      variant="subtitle1"
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
        fontWeight: 200,
        textDecoration: 'none',
      }}
    >
      <EmailIcon fontSize="small" />
      <Link color="inherit" href="mailto:vencyy@gmail.com">
        vencyy@gmail.com
      </Link>
    </Typography>
  );
}

export default ContactEmailHref;
