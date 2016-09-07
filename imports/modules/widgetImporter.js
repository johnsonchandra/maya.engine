import { ErrorPage } from '/imports/ui/widgets/default/ErrorPage';

import { Tenant } from '/imports/api/tenant/tenant_collection';

export const widgetImporter = (widget) => {
	const tenant = Tenant.findOne();

	switch (tenant.layout.framework){
		case 'Bootstrap':
			switch (widget) {
				case 'App':
					import AppContainer from '/imports/ui/widgets/Bootstrap/App/AppContainer'; return AppContainer;
				case 'AppNavigation':
					import AppNavigation from '/imports/ui/widgets/Bootstrap/AppNavigation/AppNavigationContainer'; return AppNavigation;
				case 'Login': 
					import { Login } from '/imports/ui/widgets/Bootstrap/Login/Login'; return Login;
				case 'RecoverPassword': 
					import { RecoverPassword } from '/imports/ui/widgets/Bootstrap/RecoverPassword/RecoverPassword'; return RecoverPassword;
				case 'ResetPassword': 
					import { ResetPassword } from '/imports/ui/widgets/Bootstrap/ResetPassword/ResetPassword'; return ResetPassword;
				case 'Signup': 
					import { Signup } from '/imports/ui/widgets/Bootstrap/Signup/Signup'; return Signup;
				case 'Welcome': 
					import Welcome from '/imports/ui/widgets/Bootstrap/Welcome/Welcome'; return Welcome;
				case 'HeadlineCarousel': 
					import HeadlineCarousel from '/imports/ui/widgets/Bootstrap/HeadlineCarousel/HeadlineCarousel'; return HeadlineCarousel;
				case 'Documents': 
					import { Documents } from '/imports/ui/widgets/Bootstrap/Documents/Documents'; return Documents;
				default: 
					import { NotFound } from '/imports/ui/widgets/Bootstrap/NotFound/NotFound'; return NotFound;
			};

		case 'MaterialUI':
			console.log('MaterialUI not implemented yet'); return ErrorPage;

		default:
			console.log('Framework not found'); return ErrorPage;

	};
};