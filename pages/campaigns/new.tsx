import Layout from '../../components/layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useState } from 'react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

const CampaignNew = (props) => {
  const [minimumContribution, setminimumContribution] = useState(0);
  const [errorMessage, seterrorMessage] = useState('');
  const [loading, setloading] = useState(false);

  const onSubmit = async (event:any ) => {
    event.preventDefault();
    console.log('Create Campaign: ', minimumContribution);
    setloading(true);
    seterrorMessage('');
    try {
      const accounts = await web3.eth.getAccounts();
      console.log('Create Campaign: ', accounts[0]);
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0]
      });
      setloading(false);
      Router.pushRoute('/');
    } catch(error:any) {
      seterrorMessage(error.message)
      setloading(false)
    }
  }

  return (
    <Layout>
      <h3>Create a Campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label htmlFor="">Minimum Contribution</label>
          <Input label="wei" labelPosition="right" value={minimumContribution}
          onChange={event => setminimumContribution(event.target.value)}
          type="number"></Input>
        </Form.Field>
        <Message error header='Oops' content={errorMessage} />
        <Button primary loading={loading}>Create!</Button>
      </Form>
    </Layout>
  )
}

export default CampaignNew;