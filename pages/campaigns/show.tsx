import { Card, Grid, Button } from 'semantic-ui-react';
import Web3 from 'web3';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/contributeForm';
import { useState } from 'react';
import {Router, Link} from '../../routes';

const renderCards = (props: any) => {
  const {
    balance,
    manager,
    minimumContribution,
    requestsCount,
    approversCount
  } = props;
  const items = [
    {
      header: manager,
      meta: 'Address of Manager',
      description: 'The manager created this campaign and can create requests to withdrawl money',
      style: {
        overflowWrap: 'break-word'
      }
    },
    {
      header: minimumContribution,
      meta: 'Minimum contribution',
      description: 'The manager created this campaign and can create requests to withdrawl money',
      style: {
        overflowWrap: 'break-word'
      }
    },
    {
      header: requestsCount,
      meta: 'Number of request',
      description: 'The manager created this campaign and can create requests to withdrawl money',
      style: {
        overflowWrap: 'break-word'
      }
    },
    {
      header: approversCount,
      meta: 'Number of approvers',
      description: 'The manager created this campaign and can create requests to withdrawl money',
      style: {
        overflowWrap: 'break-word'
      }
    },
    {
      header: Web3.utils.fromWei(balance, 'ether'),
      meta: 'Bance (ether)',
      description: 'The manager created this campaign and can create requests to withdrawl money',
      style: {
        overflowWrap: 'break-word'
      }
    }
  ];
  return <Card.Group items = {items} />
}
const CampaignShow = (props: PropsType) => {
  const onContribute = (result: boolean): void => {
    Router.replaceRoute(`/campaigns/${props.address}`);
  }
  return (
    <Layout>
      <h3>Cmpaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            {renderCards(props)}
            
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address} onFinish={onContribute}></ContributeForm>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <Link route={`/campaigns/${props.address}/requests`} >
              <a> 
                <Button primary>View requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}
CampaignShow.getInitialProps = async (props: any) => {
  const campaign = Campaign(props.query.address);
  const summary = await campaign.methods.getSummary().call();
  console.log(summary);
  return {
    address: props.query.address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4]
  };
}

interface PropsType {
  address: number,
  minimumcontribution: number,
  balance: number,
  requestsCount: number,
  approversCount: number,
  manager: number
}
export default CampaignShow;