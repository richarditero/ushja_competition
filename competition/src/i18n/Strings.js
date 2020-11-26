import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
  en: {
    apiRouter: {
      register: 'register',
      login: 'login',
      user: 'user',
      util: 'util',
      profile: 'profile',
      competition: 'competition',
      getCountry: 'getCountry',
      getState: 'getState',
      sendVerficationCode: 'sendVerificationCode',
      confirmVerificationCode: 'confirmVerificationCode',
      payment: 'payment',
      skipPayment: 'skip',
      forgotPassword: 'forgotPassword',
      confirmForgotPassword: 'confirmForgotPassword',
      getZone: 'getZone',
      saveSecondaryAddress: 'saveSecondaryAddress',
      removeSecondaryAddress: 'removeSecondaryAddress',
      getDiscipline: 'getDiscipline',
      saveProfileData: 'saveProfileData',
      paymentSummary: 'payment_summary',
      events: 'events',
      getIndividualDetails: 'getIndividualDetails',
      organizationRegister: 'organizationRegister',
      confirmOrganizationUserEmail: 'confirmOrganizationUserEmail'
    },
    displayText: {
      registrationConfirmMsg: 'Your registration has been confirmed',
      confimationEmailSentMsg:
        'We have sent an email with a confirmation link to your email address',
      welcomeBackLoginMsg: 'Welcome back! Please login to your account.',
      phoneNumberLength: 15,
      phoneNumberMinLength: 10,
      zipcodeMaxLength: 6,
      zipcodeMinLength: 3,
      unitedStatedOfAmerica: 'UNITED STATES OF AMERICA',
      required: 'Required.',
      pleaseEnterValidDayPhone: 'Please enter valid day phone',
      pleaseEnterValidCellPhone: 'Please enter valid cell phone',
      pleaseEnterValidZipcode: 'Please enter valid zip code',
      phoneNumberIsVerifiedSuccessfully:
        'Phone number is verified successfully',
      emailIsVerifiedSuccessfully: 'Email is verified successfully',
      yourMemebershipIsConfirmedSuccessfully:
        'Your Membership is confirmed successfully',
      pleaseSelectAMembershipType: 'Please select a membership type',
      pleaseEnterValidEmailOrPhoneNoOrId:
        'Please enter a valid email or phone number or ID',
      pleaseFillAllTheFields: 'Please fill all the fields',
      passwordDontMatch: `Passwords Don't Match.`,
      passwordMustBeSixCharacter: 'The password must be at least 6 characters.',
      forgotPasswordConfirmationCodeSentSuccessfully:
        'Forgot password confirmation code sent successfully',
      passwordChangedSuccessfully: 'Password changed successfully',
      passwordAndConfirmPasswordMustBeSame:
        'Password and confirm password must be same',
      emailIsAlreadyVerified: 'Email is already verified',
      phonenumberIsAlreadyVerified: 'Phone number is already verified',
      selectYourDisciplineDesignation: 'Select Your Discipline Designation',
      selectYourUSEFStatus: 'Select Your USEF Status',
      selectIfYouAreMemeberOfStateOrNot:
        'Select If you are member of State/Local organization or Not',
      selectYourMembershipType: 'Select your membership type',
      pleaseAcceptTheTermsAndConditions:
        'Please accept the Terms & Conditions if you want to proceed',
      uploadedFileIsnotInPdfFormat: 'Uploaded file is not in PDF format',
      selectAtLeaseOneCompetition: 'Select at least one competition',
      enterTheCompetitionName: 'Enter the Competition Name',
      enterTheCompetitionId: 'Enter the Competition Id',
      enterTheCompetitionDate: 'Enter the Competition Date',
      paymentSuccessfull: 'Payment Successfull !!!',
      defaultPhoneCountry: 'us',
      pleaseEnterNameOrId: 'Please enter either Name or Id',
      selectARole: 'Select a Role',
      owner: 'Owner',
      president: 'President',
      manager: 'Manager',
      adminAssistant: 'Admin Assistant',
      pleaseSelectARoleType: 'Please select a role type',
      pleaseDontSelectSameRoleType: `'Please don't select same role type`,
      deleteHorseMessage: 'Are you sure you want to delete this horse?',
      deteleText: 'Delete'
    }
  }
});

export default strings;
