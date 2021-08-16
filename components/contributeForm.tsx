import { Form, Input,  Message , Button} from "semantic-ui-react";
import { useState } from 'react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

const ContributeForm = (props:PropsType) => {
  const {address} = props;
  const {onFinish} = props;
  const [value, setvalue] = useState(0);
  const [loading, setloading] = useState(false);
  const campaign = Campaign(address);
  const handleSubmit = async (event:any) => {
    event.preventDefault(); 
    setloading(true);
    console.log(campaign);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        value: web3.utils.toWei(value, 'ether'),
        from: accounts[0]
      });
      setloading(false);
      onFinish(true);
    } catch(error:any) {
      setloading(false);
      onFinish(false);
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label htmlFor="">Amount of contribution</label>
        <Input 
          label='wei' 
          labelPosition="right"
          value={value}
          type="number"
          onChange={e => {
            setvalue(e.target.value);
          }}
        ></Input>
      </Form.Field>
      <Button primary loading={loading}>
        Contribute!!
      </Button>
    </Form>
  )
}

interface PropsType {
  address: number,
  onFinish: (result:boolean) => void
}

export default ContributeForm;