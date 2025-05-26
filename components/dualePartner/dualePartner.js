// Definition eines Web Components für den Abruf der Dualen Partner mittels der SudyUp REST-API
class DualePartner extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.buildCompanyList().then((result) => {
      this.companyList = result;
      this.innerHTML = `
        <li>
          ${this.companyList}
          </li> 
    `;
    });
  }

  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }

  buildCompanyList = async () => {
    // Suchparameter für die StudyUP-API zur Suche aller Partnerunternehmen, die den Studiengang IMBIT anbieten
    const query = {
      place: {
        place: '',
        radius: null,
      },
      companyName: '',
      studyCourses: [],
      subjectAreas: [],
      studyInterests: [
        {
          id: 180,
          name: 'Wirtschaftsinformatik - International Management for Business and Information Technology',
          subject_area_id: 0,
          course_id: 18,
        },
      ],
      desiredStudyYears: [],
      excludeBookmarks: false,
      includeOccupiedCompanies: true,
      name: '',
      grade: '',
      qualifications: [],
      requiredDocuments: [],
      onlyBookmarks: false,
      itemsPerPage: 1000,
      pageNumber: 1,
    };

    const requestData = async (url, requestData) => {
      const response = await fetch(url, requestData);
      return response.json();
    };

    // API-Request für Liste aller Partnerunternehmen, die IMBIT anbieten, und Informationen zur Verfügbarkeit 
    const companies = await requestData(
      'https://api.studyup.mannheim.dhbw.de/api/company-search/execute',
       {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(query),
      }
    );
  
    let companyList = `<ul> </ul>`;

    const asyncForEach = async (array, callback) => {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    await asyncForEach(companies.data.pageResults, async (company) => {

      // Erzeugen des StudyUp-Profil Links
      let studyUpLink = `https://studyup.mannheim.dhbw.de/unternehmen/profil/${company.id}`;

      //API-Request für Company-Link
      const companyDetails = await requestData(`https://api.studyup.mannheim.dhbw.de/api/company/${company.id}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });

      // Wenn Company-Link im StudyUp-Datensatz nicht gepflegt ist, wird stattdessen der Link zum StudyUP-Profil verwendet
      const companyLink = companyDetails.data.www ? companyDetails.data.www : studyUpLink;

      companyList += `<li class="type_learning" id="${company.id}" onclick="showmodal(this.id) " style="font-size:160%">
                                ${company.name} (${company.city})
                              </li> </br>`;

      let verfuegbarkeit = company.studyOffers.filter((studyOffer) => {
        return studyOffer.studyInterest.id == 180;
      });

      const verfuegbarkeitKeys = Object.keys(verfuegbarkeit[0].years);
      const verfuegbarkeitValues = Object.values(verfuegbarkeit[0].years);

      //Definition des Modal für jedes Unternehmen
      companyList += `<div class="modal" id="${
        company.id
      }_content" onclick="hideModalFromClick()" style="display: none">
        <div class="modal-wrapper" >
          <div class="modal-content" style="text-align: center; width: 80%; margin-top: 4.5em; margin-right: 4.5em; padding: 20px;">
            <span class="close" onclick="hideModalFromSpan()" style=" margin-top: -1%;">×</span> 
            <table class="dualePartner_card" style="border-radius: 10px; border: 1px solid; border-collapse: collapse; margin-top:2%; margin-left:2%; margin-right:2%; table-layout:fixed; width:95%" >
              <tr>
                <th class="dualePartner_header" colspan="3" style="background-color: #52759f; color:white;" onMouseOver="this.style.backgroundColor='#2E4159'" onMouseOut="this.style.backgroundColor='#52759f'">
                  <a href="${companyLink}" target="_blank" rel="noreferrer" style="color:white; font-family: Lato;text-decoration: none;" >
                    <p style="font-size:1.6rem;">
                      ${company.name}</p>
                    <p> 
                      Standort: ${company.city} </p>
                  </a>
                </th>
              </tr>

              <tr class="dualePartner_firstRow" style="background-color: #F5F4F4; font-weight: bold;">
                <td style="width: 35%;">
                  Studiengang/-richtung
                </td>
                <td style="width: 30%">
                  ${verfuegbarkeitKeys[0]}
                </td>
                <td style="width: 30%">
                  ${verfuegbarkeitKeys[1]}
                </td>
                
              </tr>

              <tr>
                <td style=" text-align:left; padding-left:10px;">
                ${verfuegbarkeit[0].studyInterest.name}
                </td>
                <td>
                  <p>${this.createVerfuegbarkeitsImage(
                    verfuegbarkeitValues[0]
                  )}</p>
                </td>
                <td>
                  <p>${this.createVerfuegbarkeitsImage(
                    verfuegbarkeitValues[1]
                  )}</p>
                </td>
              </tr>

              <tr>
                <td colspan="3" style="background-color: #F5F4F4; text-align: left; padding-left:10px;">
                  <a href="${studyUpLink}" target="_blank" rel="noreferrer" style="font-size:1.4rem; 
                  color: #e53f5f; font-family: Caveat Brush; text-decoration: none;  " onMouseOver="this.style.color='#991b33'" 
                  onMouseOut="this.style.color='#e53f5f'" >Ansprechpartner, Firmensitz …</a>
                </td>
              </tr>
            </table>

            <div id="legende" style="text-align: left; margin-left:2%">
              <span style="font-size: 1.25em;">✅ </span>freie Studienplätze, <span style="font-size: 1.5em;">
              ❓</span>keine Angabe, <span style="font-size: 1.25em;"> ❌ </span>keine freien Studienplätze
            </div>

            </div>
          </div>
        </div>
      </div>`;
    });
    return companyList;
  };

  // Prüfen der Verfügbarkeit und Rückgabe des jeweiligen UTF-8 Zeichens
  createVerfuegbarkeitsImage(value) {
    if (value == true) {
      return `<span style="font-size: 1.25em;">✅</span>`;
    }
    if (value == false) {
      return `<span style="font-size: 1.25em;">❌</span>`;
    }
    return `<span style="font-size: 1.5em;">❓</span>`;
  }
}

customElements.define('duale-partner', DualePartner);
