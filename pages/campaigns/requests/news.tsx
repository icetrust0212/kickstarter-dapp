import { Form, Button, Message, Input } from 'semantic-ui-react';
import campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import { FormEvent, useState } from 'react';
import Layout from '../../../components/layout';

const RequestNew = (props: any) => {
  const [value, setvalue] = useState(0);
  const [description, setdescription] = useState('');
  const [receipent, setreceipent] = useState('');

  const onCreate = (e: FormEvent) => {
    e.preventDefault();
    
  }

  return (
    <Layout>
      <Form onSubmit={onCreate}>
        <Form.Field>
          <label htmlFor="">Description</label>
          <Input
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Value in Ether</label>
          <Input
            value={value}
            type="number"
            onChange={e => {
              setvalue(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Receipent</label>
          <Input
            value={receipent}
            onChange={e => {
              setreceipent(e.target.value);
            }}
          />
        </Form.Field>
        <Button primary>Create</Button>
      </Form>
    </Layout>
  )
}

RequestNew.getInitialProps = (props: any) => {
  const { address } = props.query;
  return { address };
}

export default RequestNew;