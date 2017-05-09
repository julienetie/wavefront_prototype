import { copyrightAuthor, license } from '../../content.json';
import footerSection from './view';

const year = new Date().getFullYear();
const controller = () => footerSection(copyrightAuthor, license, year);

export default controller;
