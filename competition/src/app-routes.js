import {
  Checkout,
  CompetitionNew,
  CompetitionEventNew,
  ThankYouPage,
  PaymentSummary
} from './components';


export const publicRoutes = [

  {
    path: '/competition',
    Component: CompetitionNew
  },
  {
    path: '/competition-event',
    Component: CompetitionEventNew
  },
  {
    path: '/checkout',
    Component: Checkout,
    componetProps: PaymentSummary
  },
  {
    path: '/completed',
    Component: ThankYouPage
  }
];
