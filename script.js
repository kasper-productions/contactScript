/**
 * Created by kawika on 5/31/17.
 */
var TO_ADDRESS = "kasprod.official@gmail.com";

function formatMailBody(obj) {
    var result = "";
    for (var key in obj) {
        result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h4><div>" + obj[key] + "</div>";
    }
    return result;
}

function doPost(e) {

    try {
        //record_data(e);

        var mailData = e.postData.contents;
        var mailDataJSON = JSON.parse(mailData);

        MailApp.sendEmail({
            to: TO_ADDRESS,
            subject: String(mailDataJSON.subject),
            replyTo: String(mailDataJSON.email),
            htmlBody: formatMailBody(mailDataJSON)
        });

        return ContentService    // return json success results
            .createTextOutput(
                JSON.stringify({"result":"success",
                    "data": JSON.stringify(e.parameters) }))
            .setMimeType(ContentService.MimeType.JSON);
    } catch(error) { // if error return this
        Logger.log(error);
        return ContentService
            .createTextOutput(JSON.stringify({"result":"error", "error": e}))
            .setMimeType(ContentService.MimeType.JSON);
    }
}