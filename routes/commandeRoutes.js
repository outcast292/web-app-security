const commandeController = require('../controllers/commandeController');
const router = express.Router();

router.post('/', commandeController.postMessage);

module.exports = router;