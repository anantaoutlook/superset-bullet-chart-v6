/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, useState } from 'react';
// import { getCategoricalSchemeRegistry } from '@superset-ui/core';
import { SupersetBulletChartV6Props } from './types';
import BullectChart from './plugin/bullet';

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

export default function SupersetBulletChartV6(
  props: SupersetBulletChartV6Props,
) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉

  let [chartData, setchartData] = useState({
    data: props.data,
    height: props.height,
    width: props.width,
    colorScheme: props.colorScheme,
    orderDesc: props.orderDesc,
    bulletColorScheme: props.bulletColorScheme,
  });

  // find unique company and period key value pair
  const findUniqueCompanyAndPeriod = (arrayInput: any = [], keys: any = []) => {
    if (!Array.isArray(arrayInput)) {
      throw new TypeError(
        `Expected an array for arrayInput, got ${typeof arrayInput}`
      );
    }
    if (!Array.isArray(keys)) {
      throw new TypeError(`Expected an array for keys, got ${typeof keys}`);
    }

    const keyValues: any = arrayInput.map((value) => {
      const key = keys.map((k) => value[k]).join("|");
      return [key, value];
    });

    const kvMap = new Map(keyValues);
    return [...kvMap.values()];
  };
  const uniqueCompanyPeriod = findUniqueCompanyAndPeriod(chartData.data, [
    "period",
    "company",
  ]);

  //add year key-value to records
  const addYearToRecord = (data: any) => {
    const records: any = [];
    data.forEach((d: any) => {
      records.push({
        ...d,
        year: parseInt(d.period.substr(d.period.length - 4)),
      });
    });
    return records;
  };

  function createCompanyArray(data: any) {
    const unique = [];
    const distinct = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].company) {
        if (!unique[data[i].company]) {
          distinct.push(data[i]);
          unique[data[i].company] = 1;
        }
      }
    }
    return distinct;
  }

  // collect records for each uniqueCompanyPeriod
  const findRecordsForuniqueCompanyPeriod = (
    uniqueCompanyPeriod: any,
    yearAddedRecords: any
  ) => {
    const records: Array<any> = [];
    uniqueCompanyPeriod.forEach((ucp: any) => {
      const search = yearAddedRecords.filter(
        (cd: any) => cd.company === ucp.company && cd.period === ucp.period
      );
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
  const recordsWithCompany = addYearToRecord(chartData.data);
  const uniqueCompanies = createCompanyArray(recordsWithCompany);
  const companiesData = findRecordsForuniqueCompanyPeriod(
    uniqueCompanyPeriod,
    recordsWithCompany
  );

  useEffect(() => {
    setchartData({
      data: props.data,
      height: props.height,
      width: props.width,
      colorScheme: props.colorScheme,
      orderDesc: props.orderDesc,
      bulletColorScheme: props.bulletColorScheme,
    });
  }, [props]);

  const newProps = {
    height: 160,
    colorScheme: props.colorScheme,
    width: props.width,
    orderDesc: props.orderDesc,
    bulletColorScheme: props.bulletColorScheme,
    data: convertCompanyDataToGridData(companiesData, creatUniqueYear(recordsWithCompany)),
    years: creatUniqueYear(recordsWithCompany),
    companies:uniqueCompanies
  };
  /* const panelBody = document.querySelector(".panel-body") as HTMLDivElement;
  if (panelBody) {
    panelBody.style.overflowY = "scroll";
  } else {
    const graphicDiv = document.querySelector("#graphic") as HTMLDivElement;
    if (graphicDiv) {
      graphicDiv.style.overflowY = "scroll";
      graphicDiv.style.overflowX = "scroll";
    }
  } */
  const graphicDiv = document.querySelector("#graphic") as HTMLDivElement;
  if (graphicDiv) {
    graphicDiv.style.overflowY = "scroll";
    // graphicDiv.style.overflowX = "scroll";
  }
  const allYears = creatUniqueYear(recordsWithCompany);
  const autoString = 'auto '.repeat(allYears.length).trim();
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: autoString,
    // gap: '10px',
    alignItems: 'start',
    alignContent: 'space-between',
    justifyContent: 'space-around',
    padding: '0px 0px 50px 0px',
    height: props.height + 'px',
    width: props.width + 'px',
  };
  const normalStyle = {
    height: props.height + 'px',
    width: props.width + 'px',
    padding: '0px 0px 50px 0px',
  };
  const chartStyle = uniqueCompanies.length > 1 ? gridStyle : normalStyle;
  return (
    <div id="graphic"
      style={chartStyle}
    >
      <BullectChart props={newProps} />
    </div>
  );
}

function convertCompanyDataToGridData(companiesData: any, years: any) {
  const companyDataMap = companiesData.reduce(
    (currentMap: any, currentCompanyYearArray: any) => {
      const companyName = currentCompanyYearArray?.[0]?.company;
      const year = currentCompanyYearArray?.[0]?.year;
      const currentCompanyMap = currentMap?.[companyName]; // endResult.Denali
      if (!currentCompanyMap) {
        return {
          ...currentMap,
          [companyName]: { [year]: [currentCompanyYearArray] },
        };
      }
      if (!currentCompanyMap?.[year]) {
        return {
          ...currentMap,
          [companyName]: {
            ...currentCompanyMap,
            [year]: [currentCompanyYearArray],
          },
        };
      }
      return {
        ...currentMap,
        [companyName]: {
          ...currentCompanyMap,
          [year]: [...currentCompanyMap?.[year], currentCompanyYearArray],
        },
      };
    },
    {}
  );
  return Object.keys(companyDataMap).reduce(
    (currentArr: any[], currentCompanyKey) => {
      const currentCompanyMap = companyDataMap[currentCompanyKey]; // {2020: [], 2021: [], 2022:[]}
      let mutableCurrentCompanyArray: any[] = [];
      years.forEach((year: any) => {
        if (currentCompanyMap[year]) {
          mutableCurrentCompanyArray = [
            ...mutableCurrentCompanyArray,
            ...currentCompanyMap[year],
          ];
        } else {
          mutableCurrentCompanyArray = [...mutableCurrentCompanyArray, []];
        }
      });
      return [...currentArr, ...mutableCurrentCompanyArray];
    },
    []
  );
}

// find unique metric value
function creatUniqueYear(data: any) {
  const unique = [];
  const distinct = [];
  // const result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].year) {
      if (!unique[data[i].year]) {
        distinct.push(data[i].year);
        unique[data[i].year] = 1;
      }
    }
  }
  return distinct.sort();
}