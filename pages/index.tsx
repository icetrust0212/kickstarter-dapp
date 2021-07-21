import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react';
import factory from '../ethereum/factory';
import { NextPage } from 'next'
import {Card, Button} from 'semantic-ui-react';
import Layout from '../components/layout';
import {Link} from '../routes';

interface PropsType {
  campaigns?: any[],
}

const CampaignIndex = ({campaigns} : PropsType) => {
  const renderCampaigns = () => {
    const items = campaigns?.map(address => {
      return {
        header: address,
        description:  <Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>,
        fluid: true
      }
    });
    return <Card.Group items={items} />
  }

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link route='/campaigns/new'>
          <a>
            <Button
              content="Create Campaign"
              icon="add circle"
              primary
              floated="right"
            />
          </a>
        </Link>
        {renderCampaigns()}

      </div>
    </Layout>
  );
}

CampaignIndex.getInitialProps = async ({req}) => {
  console.log('factory: ', factory);
  const campaigns = await factory.methods.getDisplayedCampaign().call();
  console.log('Campaigns: ', campaigns);
  return { campaigns };
}

export default CampaignIndex;