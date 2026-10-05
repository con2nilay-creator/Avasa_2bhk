$(document).ready(function () {
    $('#contactus_side').click(function () {
        $('#recorderror_side').hide();
        $('#recorderror_side').html('');
        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
        var filter = /[0-9]{10}/;
        var leadName = $('#side_name').val();
        var leadPhone = $('#side_phone').val();
        var leadEmail = $('#side_email').val();
        var leadMsg = $('#side_msg').val();
        var utmSource = queryParams.utm_source;
        var utmMedium = queryParams.utm_medium;
        var utmCampaign = queryParams.utm_campaign;
        var utmTerm = queryParams.utm_term;
        var utmContent = queryParams.utm_content;
        var google_ad_id = queryParams.google_ad_id;
        var google_ad_name = queryParams.google_ad_name;
        var google_adgroup_id = queryParams.google_adgroup_id;
        var google_adgroup_name = queryParams.google_adgroup_name;
        var google_campaign_id = queryParams.google_campaign_id;
        var google_campaign_name = queryParams.google_campaign_name;
        var google_keyword_id = queryParams.google_keyword_id;
        var google_keyword_name = queryParams.google_keyword_name;

        var referrer = document.referrer;
        var userAgent = navigator.userAgent;
        var webUrl = document.baseURI;
        var deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
        if (leadName == "") {
            $('#sideerror_name').show(0).delay(5000).hide(0);
            return false;
        } else if (leadPhone == "" || !filter.test(leadPhone)) {
            $('#sideerror_mobile').show(0).delay(5000).hide(0);
            return false;
        } else if (leadEmail != '' && !pattern.test(leadEmail)) {
            $('#sideerror_email').show(0).delay(5000).hide(0);
            return false;
        }

        $('#contactus_side').hide();
        $('.sidebuttonload').show();

        if (utmSource == "" || utmSource == undefined) {
            utmSource = "Google"
        }
        // var mobileNumber = itiSide.getNumber()
        var formData = {
            name: leadName,
            phone: '+91' + leadPhone,
            email: leadEmail,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_term: utmTerm,
            utm_content: utmContent,
            google_ad_id: google_ad_id,
            google_ad_name: google_ad_name,
            google_adgroup_id: google_adgroup_id,
            google_adgroup_name: google_adgroup_name,
            google_campaign_id: google_campaign_id,
            google_campaign_name: google_campaign_name,
            google_keyword_id: google_keyword_id,
            google_keyword_name: google_keyword_name,
            vendor_remark: leadMsg,
            source: "website",
            score: "3", 
            extra: {
                terms_conditions: "Agree",
                referrer: referrer,
                userAgent: userAgent,
                url: webUrl,
                deviceType: deviceType,
                formTitle: "contactusform_side"
            },
        };


        dataLayer.push({
            'event': 'formSubmitted',
            'leadsUserData': {
                'email': leadEmail,
                'phone_number': '+91' + leadPhone,
            },
        });



        var settings = {
            async: true,
            crossDomain: true,
            url: "https://lmsapi.persquarefeet.in/submit_lead/3954c325352047cf90a8f93d19d1a60b/f088cd154d8244bea3a20780be0ad7e9",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            processData: false,
            data: JSON.stringify(formData)
        }
        $.ajax(settings).done(function (response) {
            var leadId = response.lms_id;
            if (queryParams.leadId == undefined) {
                (utmSource == undefined || utmSource == '') ? window.location = 'thank-you.html?leadId=' + leadId : window.location = 'thank-you.html?leadId=' + leadId + (window.location.href.includes('?') ? "&" + window.location.href.split('?')[1] : '');
            } else {
                var href = new URL(document.baseURI);
                href.searchParams.set('leadId', response.lms_id);
                var newUrl = href.toString().split('?')
                window.location = 'thank-you.html' + "?" + newUrl[1]
            }
            $('input').val('');
        }).fail(function (error) {
            console.log(error);
            $('#error-wrap').html(error.responseJSON.error)
            $('#recorderror_side').html(error.responseJSON.error)
            $('#recorderror_side').show();
            $('#contactus_side').show();
            $('.sidebuttonload').hide();
            setTimeout(function () {
                $('#recorderror_side').html('')
                $('#recorderror_side').hide();
            }, 5000);
        });
    });

    $('#contactus_footer').click(function () {
        $('#recorderror_footer').hide();
        $('#recorderror_footer').html('');
        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
        var filter = /[0-9]{10}/;
        var leadName = $('#footer_name').val();
        var leadPhone = $('#footer_phone').val();
        var leadEmail = $('#footer_email').val();
        var utmSource = queryParams.utm_source;
        var utmMedium = queryParams.utm_medium;
        var utmCampaign = queryParams.utm_campaign;
        var utmTerm = queryParams.utm_term;
        var utmContent = queryParams.utm_content;
        var google_ad_id = queryParams.google_ad_id;
        var google_ad_name = queryParams.google_ad_name;
        var google_adgroup_id = queryParams.google_adgroup_id;
        var google_adgroup_name = queryParams.google_adgroup_name;
        var google_campaign_id = queryParams.google_campaign_id;
        var google_campaign_name = queryParams.google_campaign_name;
        var google_keyword_id = queryParams.google_keyword_id;
        var google_keyword_name = queryParams.google_keyword_name;

        var referrer = document.referrer;
        var userAgent = navigator.userAgent;
        var webUrl = document.baseURI;
        var deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
        if (leadName == "") {
            $("#footer_name").addClass("error");
            $("#footer_name").on('keyup', function (e) {
                if ($(this).val().length != 0) {
                    $("#footer_name").removeClass("error");
                } else {
                    $("#footer_name").addClass("error");
                }
            });
            return false
        } else if (leadPhone == "" || !filter.test(leadPhone)) {
            $("#footer_phone").addClass("error");
            $("#footer_phone").on('keyup', function (e) {
                if ($(this).val().length != 0) {
                    $("#footer_phone").removeClass("error");
                } else {
                    $("#footer_phone").addClass("error");
                }
            });
            return false
        } else if (leadEmail != '' && !pattern.test(leadEmail)) {
            $("#footer_email").addClass("error");
            $("#footer_email").on('keyup', function (e) {
                if ($(this).val().length != 0) {
                    $("#footer_email").removeClass("error");
                } else {
                    $("#footer_email").addClass("error");
                }
            });
            return false
        }

        $('#contactus_footer').hide();
        $('.ftbuttonload').show();

        // var mobileNumber = itiFooter.getNumber()

        if (utmSource == "" || utmSource == undefined) {
            utmSource = "Google"
        }
        var formData = {
            name: leadName,
            phone: '+91' + leadPhone,
            email: leadEmail,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_term: utmTerm,
            utm_content: utmContent,
            google_ad_id: google_ad_id,
            google_ad_name: google_ad_name,
            google_adgroup_id: google_adgroup_id,
            google_adgroup_name: google_adgroup_name,
            google_campaign_id: google_campaign_id,
            google_campaign_name: google_campaign_name,
            google_keyword_id: google_keyword_id,
            google_keyword_name: google_keyword_name,
            source: "website",
            score: "3",
            extra: {
                terms_conditions: "Agree",
                referrer: referrer,
                userAgent: userAgent,
                url: webUrl,
                deviceType: deviceType,
                formTitle: "contactus_Footer"
            },
        };

        dataLayer.push({
            'event': 'formSubmitted',
            'leadsUserData': {
                'email': leadEmail,
                'phone_number': '+91' + leadPhone,
            },
        });


        var settings = {
            async: true,
            crossDomain: true,
            url: "https://lmsapi.persquarefeet.in/submit_lead/3954c325352047cf90a8f93d19d1a60b/f088cd154d8244bea3a20780be0ad7e9",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            processData: false,
            data: JSON.stringify(formData)
        }
        $.ajax(settings).done(function (response) {
            var leadId = response.lms_id;
            if (queryParams.leadId == undefined) {
                (utmSource == undefined || utmSource == '') ? window.location = 'thank-you.html?leadId=' + leadId : window.location = 'thank-you.html?leadId=' + leadId + (window.location.href.includes('?') ? "&" + window.location.href.split('?')[1] : '');
            } else {
                var href = new URL(document.baseURI);
                href.searchParams.set('leadId', response.lms_id);
                var newUrl = href.toString().split('?')
                window.location = 'thank-you.html' + "?" + newUrl[1]
            }
            $('input').val('');
        }).fail(function (error) {
            console.log(error);
            $('#error-wrap').html(error.responseText.error)
            $('#recorderror_footer').html(error.responseJSON.error)
            $('#recorderror_footer').show();
            $('#contactus_footer').show();
            $('.ftbuttonload').hide();
            setTimeout(function () {
                $('#recorderror_footer').html('')
                $('#recorderror_footer').hide();
            }, 5000);
        });
    });

    $('#contactus_modal').click(function () {
        $('#recorderror_modal').hide();
        $('#recorderror_modal').html('');
        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
        var filter = /[0-9]{10}/;
        var leadName = $('#modal_name').val();
        var leadPhone = $('#modal_phone').val();
        var leadEmail = $('#modal_email').val();
        var leadMsg = $('#modal_msg').val();
        var formTitle = $('.modal-title').text();
        var utmSource = queryParams.utm_source;
        var utmMedium = queryParams.utm_medium;
        var utmCampaign = queryParams.utm_campaign;
        var utmTerm = queryParams.utm_term;
        var utmContent = queryParams.utm_content;
        var google_ad_id = queryParams.google_ad_id;
        var google_ad_name = queryParams.google_ad_name;
        var google_adgroup_id = queryParams.google_adgroup_id;
        var google_adgroup_name = queryParams.google_adgroup_name;
        var google_campaign_id = queryParams.google_campaign_id;
        var google_campaign_name = queryParams.google_campaign_name;
        var google_keyword_id = queryParams.google_keyword_id;
        var google_keyword_name = queryParams.google_keyword_name;

        var referrer = document.referrer;
        var userAgent = navigator.userAgent;
        var webUrl = document.baseURI;
        var deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
        if (leadName == "") {
            $('#modalerror_name').show(0).delay(5000).hide(0);
            return false;
        } else if (leadPhone == "" || !filter.test(leadPhone)) {
            $('#modalerror_mobile').show(0).delay(5000).hide(0);
            return false;
        } else if (leadEmail != '' && !pattern.test(leadEmail)) {
            $('#modalerror_email').show(0).delay(5000).hide(0);
            return false;
        }

        $('#contactus_modal').hide();
        $('.modalbuttonload').show();

        if (utmSource == "" || utmSource == undefined) {
            utmSource = "Google"
        }
        // var mobileNumber = itiModal.getNumber()
        var formData = {
            name: leadName,
            phone: '+91' + leadPhone,
            email: leadEmail,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_term: utmTerm,
            utm_content: utmContent,
            google_ad_id: google_ad_id,
            google_ad_name: google_ad_name,
            google_adgroup_id: google_adgroup_id,
            google_adgroup_name: google_adgroup_name,
            google_campaign_id: google_campaign_id,
            google_campaign_name: google_campaign_name,
            google_keyword_id: google_keyword_id,
            google_keyword_name: google_keyword_name,
            vendor_remark: leadMsg,
            source: "website",
            score: "3",
            extra: {
                terms_conditions: "Agree",
                referrer: referrer,
                userAgent: userAgent,
                url: webUrl,
                deviceType: deviceType,
                formTitle: formTitle,
            },
        };


        dataLayer.push({
            'event': 'formSubmitted',
            'leadsUserData': {
                'email': leadEmail,
                'phone_number': '+91' + leadPhone,
            },
        });



        var settings = {
            async: true,
            crossDomain: true,
            url: "https://lmsapi.persquarefeet.in/submit_lead/3954c325352047cf90a8f93d19d1a60b/f088cd154d8244bea3a20780be0ad7e9",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            processData: false,
            data: JSON.stringify(formData)
        }
        $.ajax(settings).done(function (response) {
            var leadId = response.lms_id;
            if (queryParams.leadId == undefined) {
                (utmSource == undefined || utmSource == '') ? window.location = 'thank-you.html?leadId=' + leadId : window.location = 'thank-you.html?leadId=' + leadId + (window.location.href.includes('?') ? "&" + window.location.href.split('?')[1] : '');
            } else {
                var href = new URL(document.baseURI);
                href.searchParams.set('leadId', response.lms_id);
                var newUrl = href.toString().split('?')
                window.location = 'thank-you.html' + "?" + newUrl[1]
            }
            $('input').val('');
        }).fail(function (error) {
            console.log(error);
            $('#error-wrap').html(error.responseJSON.error);
            $('#recorderror_modal').html(error.responseJSON.error);
            $('#recorderror_modal').show();
            $('#contactus_modal').show();
            $('.modalbuttonload').hide();
            setTimeout(function () {
                $('#recorderror_modal').html('')
                $('#recorderror_modal').hide();
            }, 5000);
        });
    });
    $('#contactus_banner').click(function () {
        $('#recorderror_banner').hide();
        $('#recorderror_banner').html('');
        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
        var filter = /[0-9]{8}/;
        var leadName = $('#banner_name').val();
        var leadPhone = $('#banner_phone').val();
        var leadEmail = $('#banner_email').val();
        var leadMsg = $('#banner_msg').val();
        var formTitle = $('.banner-form-title').text();
        var utmSource = queryParams.utm_source;
        var utmMedium = queryParams.utm_medium;
        var utmCampaign = queryParams.utm_campaign;
        var utmTerm = queryParams.utm_term;
        var utmContent = queryParams.utm_content;
        var google_ad_id = queryParams.google_ad_id;
        var google_ad_name = queryParams.google_ad_name;
        var google_adgroup_id = queryParams.google_adgroup_id;
        var google_adgroup_name = queryParams.google_adgroup_name;
        var google_campaign_id = queryParams.google_campaign_id;
        var google_campaign_name = queryParams.google_campaign_name;
        var google_keyword_id = queryParams.google_keyword_id;
        var google_keyword_name = queryParams.google_keyword_name;

        var keyWords = queryParams.kwd;
        var referrer = document.referrer;
        var userAgent = navigator.userAgent;
        var webUrl = document.baseURI;
        var deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

        if (leadName == "") {
            $('#bannererror_name').show(0).delay(5000).hide(0);
            return false;
        } else if (leadPhone == "" || !filter.test(leadPhone)) {
            $('#bannererror_mobile').show(0).delay(5000).hide(0);
            return false;
        } else if (leadEmail != '' && !pattern.test(leadEmail)) {
            $('#bannererror_email').show(0).delay(5000).hide(0);
            return false;
        }
        $('#contactus_banner').hide();
        $('.bannerbuttonload').show();

        if (utmSource == "" || utmSource == undefined) {
            utmSource = "Google"
        }
        // var mobileNumber = itiBanner.getNumber()
        var formData = {
            name: leadName,
            phone: '+91' + leadPhone,
            email: leadEmail,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_term: utmTerm,
            utm_content: utmContent,
            google_ad_id: google_ad_id,
            google_ad_name: google_ad_name,
            google_adgroup_id: google_adgroup_id,
            google_adgroup_name: google_adgroup_name,
            google_campaign_id: google_campaign_id,
            google_campaign_name: google_campaign_name,
            google_keyword_id: google_keyword_id,
            google_keyword_name: google_keyword_name,
            vendor_remark: leadMsg,
            source: "website",
            score: "3",
            extra: {
                terms_conditions: "Agree",
                referrer: referrer,
                userAgent: userAgent,
                url: webUrl,
                deviceType: deviceType,
                formTitle: formTitle,
            },
        };


        dataLayer.push({
            'event': 'formSubmitted',
            'leadsUserData': {
                'email': leadEmail,
                'phone_number': '+91' + leadPhone,
            },
        });



        var settings = {
            async: true,
            crossDomain: true,
            url: "https://lmsapi.persquarefeet.in/submit_lead/3954c325352047cf90a8f93d19d1a60b/f088cd154d8244bea3a20780be0ad7e9",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            processData: false,
            data: JSON.stringify(formData)
        }
        $.ajax(settings).done(function (response) {
            var leadId = response.lms_id;
            if (queryParams.leadId == undefined) {
                (utmSource == undefined || utmSource == '') ? window.location = 'thank-you.html?leadId=' + leadId : window.location = 'thank-you.html?leadId=' + leadId + (window.location.href.includes('?') ? "&" + window.location.href.split('?')[1] : '');
            } else {
                var href = new URL(document.baseURI);
                href.searchParams.set('leadId', response.lms_id);
                var newUrl = href.toString().split('?')
                window.location = 'thank-you.html' + "?" + newUrl[1]
            }
            $('input').val('');
        }).fail(function (error) {
            console.log(error);
            $('#error-wrap').html(error.responseJSON.error)
            $('#recorderror_banner').html(error.responseJSON.error)
            $('#recorderror_banner').show();
            $('#contactus_banner').show();
            $('.bannerbuttonload').hide();
            setTimeout(function () {
                $('#recorderror_banner').html('')
                $('#recorderror_banner').hide();
            }, 5000);
        });
    });
});
(jQuery);
