import axios from "axios";
import { XMLParser } from "fast-xml-parser"; // Import the parser

// These are the APIs that will be integrated with OpenText Directory Service (OTDS).

// 1. First API: Get the OTDS ticket using username and password
export const loginOTDS = async (username, password) => {
  try {
    const response = await axios.post(
      `http://psuite:8080/otdsws/rest/authentication/credentials`,
      {
        userName: username,
        password: password,
      }
    );
    console.log(` ticket ::  ${response.data.ticket}`); //expected to see ticket include in json response
    localStorage.setItem("Ticket", response.data.ticket);
    return response.data.ticket;
  } catch (error) {
    throw new Error("Invalid credentials :: " + error.message);
  }
};

// 2. Second API: Generate the SAML token using the OTDS ticket
export const generateSamlToken = async (ticket) => {
  const soapEnvelope = `
    <SOAP:Envelope xmlns:SOAP="http://schemas.xmlsoap.org/soap/envelope/">
      <SOAP:Header>
        <OTAuthentication xmlns="urn:api.bpm.opentext.com">
          <AuthenticationToken>${ticket}</AuthenticationToken>
        </OTAuthentication>
      </SOAP:Header>
      <SOAP:Body>
        <samlp:Request xmlns:samlp="urn:oasis:names:tc:SAML:1.0:protocol" MajorVersion="1" MinorVersion="1" IssueInstant="2018-09-07T16:47:13.359Z" RequestID="a5470c392e-264e-jopl-56ac-4397b1b416d">
          <samlp:AuthenticationQuery>
            <saml:Subject xmlns:saml="urn:oasis:names:tc:SAML:1.0:assertion">
              <saml:NameIdentifier Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"/>
            </saml:Subject>
          </samlp:AuthenticationQuery>
        </samlp:Request>
      </SOAP:Body>
    </SOAP:Envelope>
  `;

  try {
    const response = await axios.post(
      `http://psuite:81/home/system/com.eibus.web.soap.Gateway.wcp`,
      soapEnvelope,
      {
        headers: {
          "Content-Type": "application/xml",
          Accept: "*/*",
        },
      }
    );

    const result = convertXMLToJSON(response);

    console.log(
      `Saml Token is created :: ${result["SOAP:Envelope"]["SOAP:Body"]["samlp:Response"]["samlp:AssertionArtifact"]}`
    );
    localStorage.setItem(
      "SamlArt",
      result["SOAP:Envelope"]["SOAP:Body"]["samlp:Response"][
        "samlp:AssertionArtifact"
      ]
    );
    return result["SOAP:Envelope"]["SOAP:Body"]["samlp:Response"][
      "samlp:AssertionArtifact"
    ];
  } catch (error) {
    throw new Error("Failed to generate SAML token :: " + error.message);
  }
};

// 3. Third API: Get user details using the SAML token (SAML Art)
export const getUserDetails = async () => {
  const soapEnvelope = `
    <SOAP:Envelope xmlns:SOAP="http://schemas.xmlsoap.org/soap/envelope/">
      <SOAP:Body>
        <GetUserDetails xmlns="http://schemas.cordys.com/1.0/ldap"></GetUserDetails>
      </SOAP:Body>
    </SOAP:Envelope>
  `;

  try {
    const response = await axios.post(
      `http://psuite:81/home/system/com.eibus.web.soap.Gateway.wcp?samlArt=${localStorage.getItem(
        "SamlArt"
      )}`,
      soapEnvelope,
      {
        headers: {
          "Content-Type": "application/xml",
          Accept: "*/*",
        },
      }
    );

    const result = convertXMLToJSON(response);
    console.log("Fetched user details :: "); // Parsed JSON object
    console.log(result);
    return result;
  } catch (error) {
    throw new Error("Failed to get user details :: " + error.message);
  }
};

// Parse XML response to JSON format
function convertXMLToJSON(response) {
  const parser = new XMLParser();
  const result = parser.parse(response.data);
  return result;
}
export class AuthService {
  static loginOTDS = loginOTDS;
  static generateSamlToken = generateSamlToken;
  static getUserDetails = getUserDetails;
}
