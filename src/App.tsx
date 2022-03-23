// ALL ROUTES
import Routes from './routes/Routes';

// HELPERS
import { configureFakeBackend } from './helpers';

// DEFAULT THEME
import './assets/scss/Theme.scss';

const App = () => {
    configureFakeBackend();
    return <Routes />;
};

export default App;
