import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiDatetime from 'chai-datetime';
import * as _sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(chaiDatetime);
chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();

export const assert = chai.assert;
export const expect = chai.expect;
export const sinon = _sinon;
