'use strict'

window.onload = async function() {
  const token = '';
  const today = new Date();
  const week = new Date();
  const month = new Date();
  const year = new Date();
  today.setHours(0,0,0,0);
  week.setHours(0,0,0,0);
  month.setHours(0,0,0,0);
  year.setHours(0,0,0,0);
  week.setDate(week.getDate() - 7);
  month.setMonth(month.getMonth() - 1);
  year.setFullYear(year.getFullYear() - 1);
  const tString = today.toISOString();
  const wString = week.toISOString();
  const mString = month.toISOString();
  const yString = year.toISOString();

  const tdata = { query:
    `query {
        viewer {
          contributionsCollection(from: "${tString}", to: "${tString}") {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }`
    };

  const wdata = { query:
    `query {
        viewer {
          contributionsCollection(from: "${wString}", to: "${tString}") {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }`
    };

  const mdata = { query:
    `query {
        viewer {
          contributionsCollection(from: "${mString}", to: "${tString}") {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }`
    };

  const ydata = { query:
    `query {
        viewer {
          contributionsCollection(from: "${yString}", to: "${tString}") {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }`
    };

  const tres = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(tdata)
  });

  const wres = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(wdata)
  });

  const mres = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(mdata)
  });

  const yres = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(ydata)
  });

  var tresult = await tres.json();
  var wresult = await wres.json();
  var mresult = await mres.json();
  var yresult = await yres.json();

  const tElem = document.getElementById('today');
  const tSpan = tElem.querySelector("span");
  tSpan.innerHTML = tresult.data.viewer.contributionsCollection.contributionCalendar.totalContributions;

  const wElem = document.getElementById('week');
  const wSpan = wElem.querySelector("span");
  wSpan.innerHTML = wresult.data.viewer.contributionsCollection.contributionCalendar.totalContributions;

  const mElem = document.getElementById('month');
  const mSpan = mElem.querySelector("span");
  mSpan.innerHTML = mresult.data.viewer.contributionsCollection.contributionCalendar.totalContributions;

  const yElem = document.getElementById('year');
  const ySpan = yElem.querySelector("span");
  ySpan.innerHTML = yresult.data.viewer.contributionsCollection.contributionCalendar.totalContributions;
}