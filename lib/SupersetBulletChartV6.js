"use strict";

exports.__esModule = true;
exports.default = SupersetBulletChartV6;

var _react = _interopRequireWildcard(require("react"));

var _bullet = _interopRequireDefault(require("./plugin/bullet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// const categorialSchemeRegistry = getCategoricalSchemeRegistry();
// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled
// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */
function SupersetBulletChartV6(props) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  var [chartData, setchartData] = (0, _react.useState)({
    data: props.data,
    height: props.height,
    width: props.width,
    colorScheme: props.colorScheme,
    orderDesc: props.orderDesc,
    bulletColorScheme: props.bulletColorScheme
  }); // find unique company and period key value pair

  var findUniqueCompanyAndPeriod = function findUniqueCompanyAndPeriod(arrayInput, keys) {
    if (arrayInput === void 0) {
      arrayInput = [];
    }

    if (keys === void 0) {
      keys = [];
    }

    if (!Array.isArray(arrayInput)) {
      throw new TypeError("Expected an array for arrayInput, got " + typeof arrayInput);
    }

    if (!Array.isArray(keys)) {
      throw new TypeError("Expected an array for keys, got " + typeof keys);
    }

    var keyValues = arrayInput.map(value => {
      var key = keys.map(k => value[k]).join("|");
      return [key, value];
    });
    var kvMap = new Map(keyValues);
    return [...kvMap.values()];
  };

  var uniqueCompanyPeriod = findUniqueCompanyAndPeriod(chartData.data, ["period", "company"]); //add year key-value to records

  var addYearToRecord = data => {
    var records = [];
    data.forEach(d => {
      records.push(_extends({}, d, {
        year: parseInt(d.period.substr(d.period.length - 4))
      }));
    });
    return records;
  }; // collect records for each uniqueCompanyPeriod


  var findRecordsForuniqueCompanyPeriod = (uniqueCompanyPeriod, yearAddedRecords) => {
    var records = [];
    uniqueCompanyPeriod.forEach(ucp => {
      var search = yearAddedRecords.filter(cd => cd.company === ucp.company && cd.period === ucp.period);
      records.push(search);
    });
    records.sort(function (a, b) {
      if (a[0].company === b[0].company) {
        // Price is only important when cities are the same
        return a[0].year - b[0].year;
      }

      return a[0].company > b[0].company ? 1 : -1;
    });
    return records;
  };

  var recordsWithCompany = addYearToRecord(chartData.data);
  var companiesData = findRecordsForuniqueCompanyPeriod(uniqueCompanyPeriod, recordsWithCompany);
  (0, _react.useEffect)(() => {
    setchartData({
      data: props.data,
      height: props.height,
      width: props.width,
      colorScheme: props.colorScheme,
      orderDesc: props.orderDesc,
      bulletColorScheme: props.bulletColorScheme
    });
  }, [props]);
  var newProps = {
    height: 160,
    colorScheme: props.colorScheme,
    width: props.width,
    orderDesc: props.orderDesc,
    bulletColorScheme: props.bulletColorScheme,
    data: convertCompanyDataToGridData(companiesData, creatUniqueYear(recordsWithCompany)),
    years: creatUniqueYear(recordsWithCompany)
  };
  var panelBody = document.querySelector(".panel-body");

  if (panelBody) {
    panelBody.style.overflowY = "scroll";
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    id: "graphic",
    style: {
      display: "grid",
      gridTemplateColumns: "auto auto auto auto",
      gap: '10px',
      alignItems: 'start',
      alignContent: 'space-between',
      justifyContent: 'space-around',
      padding: '5px 10px'
    }
  }, /*#__PURE__*/_react.default.createElement(_bullet.default, {
    props: newProps
  }));
}

function convertCompanyDataToGridData(companiesData, years) {
  var companyDataMap = companiesData.reduce((currentMap, currentCompanyYearArray) => {
    var _currentCompanyYearAr, _currentCompanyYearAr2;

    var companyName = currentCompanyYearArray == null ? void 0 : (_currentCompanyYearAr = currentCompanyYearArray[0]) == null ? void 0 : _currentCompanyYearAr.company;
    var year = currentCompanyYearArray == null ? void 0 : (_currentCompanyYearAr2 = currentCompanyYearArray[0]) == null ? void 0 : _currentCompanyYearAr2.year;
    var currentCompanyMap = currentMap == null ? void 0 : currentMap[companyName]; // endResult.Denali

    if (!currentCompanyMap) {
      return _extends({}, currentMap, {
        [companyName]: {
          [year]: [currentCompanyYearArray]
        }
      });
    }

    if (!(currentCompanyMap != null && currentCompanyMap[year])) {
      return _extends({}, currentMap, {
        [companyName]: _extends({}, currentCompanyMap, {
          [year]: [currentCompanyYearArray]
        })
      });
    }

    return _extends({}, currentMap, {
      [companyName]: _extends({}, currentCompanyMap, {
        [year]: [...(currentCompanyMap == null ? void 0 : currentCompanyMap[year]), currentCompanyYearArray]
      })
    });
  }, {});
  return Object.keys(companyDataMap).reduce((currentArr, currentCompanyKey) => {
    var currentCompanyMap = companyDataMap[currentCompanyKey]; // {2020: [], 2021: [], 2022:[]}

    var mutableCurrentCompanyArray = [];
    years.forEach(year => {
      if (currentCompanyMap[year]) {
        mutableCurrentCompanyArray = [...mutableCurrentCompanyArray, ...currentCompanyMap[year]];
      } else {
        mutableCurrentCompanyArray = [...mutableCurrentCompanyArray, []];
      }
    });
    return [...currentArr, ...mutableCurrentCompanyArray];
  }, []);
} // find unique metric value


function creatUniqueYear(data) {
  var unique = [];
  var distinct = []; // const result = [];

  for (var i = 0; i < data.length; i++) {
    if (data[i].year) {
      if (!unique[data[i].year]) {
        distinct.push(data[i].year);
        unique[data[i].year] = 1;
      }
    }
  }

  return distinct.sort();
}