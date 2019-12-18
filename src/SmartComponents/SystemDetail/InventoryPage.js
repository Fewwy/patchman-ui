import * as reactCore from '@patternfly/react-core';
import * as reactIcons from '@patternfly/react-icons';
import { Main } from '@redhat-cloud-services/frontend-components';
import React from 'react';
import { useSelector } from 'react-redux';
import * as reactRouterDom from 'react-router-dom';
import Header from '../../PresentationalComponents/Header/Header';
import { paths } from '../../Routes';
import { getStore, register } from '../../store';

const InventoryDetail = () => {
    const [InventoryHeader, setInventoryHeader] = React.useState();
    const [InventoryBody, setInventoryBody] = React.useState();

    const entityDetails = useSelector(
        ({ entityDetails }) => entityDetails && entityDetails.entity
    );

    const fetchInventory = async () => {
        const {
            inventoryConnector,
            mergeWithDetail
        } = await insights.loadInventory({
            react: React,
            reactRouterDom,
            reactCore,
            reactIcons
        });

        register({
            ...mergeWithDetail()
        });

        const { InventoryDetailHead, AppInfo } = inventoryConnector(getStore());
        setInventoryHeader(() => InventoryDetailHead);
        setInventoryBody(() => AppInfo);
    };

    React.useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <React.Fragment>
            <Header
                title=""
                breadcrumbs={[
                    {
                        title: 'System Patching',
                        to: paths.advisories.to,
                        isActive: false
                    },
                    entityDetails && {
                        title: entityDetails.display_name,
                        isActive: true
                    }
                ]}
            >
                {InventoryHeader && <InventoryHeader hideBack />}
            </Header>
            {InventoryBody && (
                <Main>
                    <InventoryBody />
                </Main>
            )}
        </React.Fragment>
    );
};

export default InventoryDetail;
