import PropTypes from 'prop-types';

import styled from 'styled-components';
import oc from 'open-color';
import { media } from 'helpers/style-utils';

import EditIcon from 'react-icons/lib/md/edit';
import DeleteIcon from 'react-icons/lib/md/delete';
import CloseIcon from 'react-icons/lib/md/close';

import SecurityIcon from 'react-icons/lib/md/security';
import PdnIcon from 'react-icons/lib/md/cast';
import KeyboardControlIcon from 'react-icons/lib/md/keyboard-control';

import { Modal, Tooltip, Dimmed } from 'components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  postion: relative;
  width: 600px;

  ${media.mobile`
    width: calc(100vw - 4rem);
  `}

  background: white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`

const Header = styled.div`
  position: relative;
  display: flex;

  background: ${oc.gray[1]};

  .title {
    padding: 1.5rem;
    color: ${oc.gray[8]};
    font-size: 1.5rem;
  }

  .actions {
    position: absolute;
    top: 0;
    right: 0;
    width: 8rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CircleButton = styled.div`
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px;

  color: ${oc.gray[6]};

  border-radius: 1rem;
  font-size: 1.5rem;

  &:hover {
    color: ${oc.indigo[6]};
  }

  &.delete {
    &:hover {
      color: ${oc.pink[6]};
    }
  }
`

const Body = styled.div`
  display: block;
  margin: 0.5rem;

  height: 320px;
  ${media.mobile`
    height: calc(100vh - 16rem);
  `}

  overflow: scroll;
`

const Subscriber = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0, auto;
  color: ${oc.gray[9]};

  .header {
    margin: 12px;
    font-size: 16px;
  }
  .body {
    display: flex;
    flex-direction: row;
    flex:1;
    margin: 6px;

    .left {
      width: 80px;
      text-align: center;
      font-size: 18px;
      color: ${oc.gray[6]};
    }

    .right {
      display: flex;
      flex-direction: column;
      flex:1;

      .data {
        flex:1;
        font-size: 12px;
        margin: 4px;
      }
    }
  }
`

const Pdn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  color: ${oc.gray[9]};

  .header {
    margin: 12px;
    font-size: 16px;
  }
  .body {
    display: flex;
    flex-direction: row;
    flex:1;
    margin: 0px 32px;

    .data {
      width: 80px;
      font-size: 12px;
      margin: 4px;
    }
  }
`
const View = ({ visible, disableOnClickOutside, subscriber, onEdit, onDelete, onHide }) => {
  const imsi = (subscriber || {}).imsi;
  const security = ((subscriber || {}).security || {});
  const ue_ambr = ((subscriber || {}).ue_ambr || {});
  const pdns = ((subscriber || {}).pdn || []);

  return (
    <div>
      <Modal 
        visible={visible} 
        onOutside={onHide}
        disableOnClickOutside={disableOnClickOutside}>
        <Wrapper>
          <Header>
            <div className="title">{imsi}</div>
            <div className="actions">
              <Tooltip content='Edit' width="60px">
                <CircleButton onClick={() => onEdit(imsi)}><EditIcon/></CircleButton>
              </Tooltip>
              <Tooltip content='Delete' width="60px">
                <CircleButton className="delete" onClick={() => onDelete(imsi)}><DeleteIcon/></CircleButton>
              </Tooltip>
              <Tooltip content='Close' width="60px">
                <CircleButton className="delete" onClick={onHide}><CloseIcon/></CircleButton>
              </Tooltip>
            </div>
          </Header>
          <Body>
            <Subscriber>
              <div className="header">
                Subscriber Details
              </div>
              <div className="body">
                <div className="left">
                  <SecurityIcon/>
                </div>
                <div className="right">
                  <div className="data">
                    {security.k}
                    <span style={{color:oc.gray[5]}}><KeyboardControlIcon/>K</span>
                  </div>
                  <div className="data">
                    {security.op}
                    <span style={{color:oc.gray[5]}}><KeyboardControlIcon/>OP</span>
                  </div>
                  <div className="data">
                    {security.amf}
                    <span style={{color:oc.gray[5]}}><KeyboardControlIcon/>AMF</span>
                  </div>
                </div>
              </div>
              <div className="body">
                <div className="left">
                  <PdnIcon/>
                </div>
                <div className="right">
                  <div className="data">
                    {ue_ambr.max_bandwidth_ul} Kbps
                    <span style={{color:oc.gray[5]}}><KeyboardControlIcon/>UL</span>
                  </div>
                  <div className="data">
                    {ue_ambr.max_bandwidth_dl} Kbps
                    <span style={{color:oc.gray[5]}}><KeyboardControlIcon/>DL</span>
                  </div>
                </div>
              </div>
            </Subscriber>
            <Pdn>
              <div className="header">
                PDN
              </div>
              <div className="body" style={{color:oc.gray[5]}}>
                <div className="data">APN</div>
                <div className="data">QCI</div>
                <div className="data">ARP</div>
                <div className="data">UL/DL(Kbps)</div>
              </div>
              {pdns.map(pdn =>
                <div className="body" key={pdn.apn}>
                  <div className="data">{pdn.apn}</div>
                  <div className="data">{pdn.qos.qci}</div>
                  <div className="data">{pdn.qos.arp.priority_level}</div>
                  <div className="data">{pdn.pdn_ambr.max_bandwidth_ul}/{pdn.pdn_ambr.max_bandwidth_ul}</div>
                </div>
              )}
            </Pdn>
          </Body>
        </Wrapper>
      </Modal>
      <Dimmed visible={visible}/>
    </div>
  )
}

export default View;