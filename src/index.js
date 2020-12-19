import { Router } from './core/routes/Router';
import { DashboardPage } from './pages/DashboardPage';
import { ExcelPage } from './pages/Excelpage';
import './scss/index.scss';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
