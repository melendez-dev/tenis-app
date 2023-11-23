import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlledAccordions({ summary, details, handleChange, expanded, panel = 'panel1' }) {

  return (
    <div>
      <Accordion expanded={expanded == panel} onChange={handleChange(panel)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
            {summary}
        </AccordionSummary>
        <AccordionDetails>
          {details}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
