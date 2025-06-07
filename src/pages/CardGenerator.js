import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Grid, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CardGenerator = ({
  text,
  img = false,
  imgUrl,
  url = '#',
  borderColor = '#000',
  textColor = '#000',
  iconColor = '#000',
  mdSize = 6,
  lgSize = 6,
  xlSize = 6,
  smSize = 6,
  xsSize = 12,
}) => {
  return (
    <Grid item xs={xsSize} sm={smSize} md={mdSize} lg={lgSize} xl={xlSize}>
      <Card
        variant="outlined"
        sx={{
          borderColor,
          height: '100%',
          transition: '0.3s',
          '&:hover': { boxShadow: 4 },
        }}
      >
        <CardActionArea href={url}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography
                variant="h6"
                sx={{
                  color: textColor,
                  fontWeight: 600,
                }}
              >
                {text}
              </Typography>
            
             
                <ArrowForwardIcon sx={{ color: iconColor }} />
             
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CardGenerator;
