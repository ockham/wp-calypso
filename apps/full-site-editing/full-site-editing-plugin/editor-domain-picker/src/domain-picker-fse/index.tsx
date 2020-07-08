/**
 * External dependencies
 */
import * as React from 'react';
import DomainPicker, { Props as DomainPickerProps } from '@automattic/domain-picker';
import type { DomainSuggestions } from '@automattic/data-stores';
import { Cart } from '@automattic/wpcom-hooks';

/**
 * Internal dependencies
 */
import 'a8c-fse-common-data-stores';
import { useSite, useCurrentDomain } from '../hooks/use-current-domain';

const FLOW_ID = 'gutenboarding';

export type Props = Partial< DomainPickerProps >;

let a = 1;

const DomainPickerFSE: React.FunctionComponent< Props > = ( props ) => {
	const [ domainSearch, setDomainSearch ] = React.useState( '' );

	const site = useSite();

	const [ cart, setCart ] = Cart.useSiteCart?.( site?.ID );

	// this hacky logic is just to test both reading and writing functionalities of the hook in the PR
	if ( cart && a-- ) {
		setCart( cart );
	}

	const currentDomain = useCurrentDomain();

	const search = ( domainSearch.trim() || site?.name ) ?? '';

	// TODO: This should go to the domain or launch store.
	const [ domainName, setDomainName ] = React.useState( currentDomain );

	const handleDomainSelect = ( domain?: DomainSuggestions.DomainSuggestion ) => {
		// TODO: store whole domain suggestion object here because it has product_id and other useful info
		// that we need for the cart
		setDomainName( domain?.domain_name );
	};

	return (
		<DomainPicker
			analyticsFlowId={ FLOW_ID }
			analyticsUiAlgo="editor_domain_modal"
			initialDomainSearch={ search }
			onSetDomainSearch={ setDomainSearch }
			showDomainCategories
			currentDomain={ domainName }
			onDomainSelect={ handleDomainSelect }
			{ ...props }
		/>
	);
};

export default DomainPickerFSE;
