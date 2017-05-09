import mimetic from 'mimetic';
import ui from './ui'; 
import doIt from './ui/headings/controller';

// Render User Interface.
ui();


// Make viewport Scalable.
mimetic({
    deviceSplitting: true
});