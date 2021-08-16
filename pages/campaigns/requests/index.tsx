import Layout from '../../../components/layout';
import { Button } from 'semantic-ui-react';
import {Link} from '../../../routes';

const RequestIndex = (props:PropsType) => {
  
  return (
    <Layout>
      <h2>Reqeusts</h2>
      <Link route={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
    </Layout>
  )
}

RequestIndex.getInitialProps = (props:any) => {
  const {address} = props.query;
  return {address};
}
interface PropsType {
  address: number
}
export default RequestIndex;