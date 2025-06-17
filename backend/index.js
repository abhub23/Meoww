'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
const express_1 = __importDefault(require('express'));
const node_cron_1 = __importDefault(require('node-cron'));
const cors_1 = __importDefault(require('cors'));
const axios_1 = __importDefault(require('axios'));
dotenv_1.default.config({ path: '../.env' });
const api_secret = process.env.CATAPI;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(
  (0, cors_1.default)({
    origin: '*',
  })
);
const PORT = 8090;
app.get('/', (_, res) => {
  res.json({ message: 'Server is alive' });
});
let caturl;
node_cron_1.default.schedule('* * * * *', () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const response = yield axios_1.default.get('https://api.thecatapi.com/v1/images/search', {
        headers: {
          'x-api-key': api_secret,
        },
      });
      caturl = response.data[0].url;
      console.log(caturl);
    } catch (error) {
      console.error('Error occured in Api call: ', error);
    }
  })
);
app.get('/getimage', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
      caturl,
      success: true,
    });
  })
);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
