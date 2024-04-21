import { Alert, Button, Snackbar } from '@mui/material';
import { useRef, useState } from 'react';
import { FetchCreateUserRequest, UserDetail } from '@/src/interface/users';
import { css } from '@/styled-system/css';
import SNTextField, {
  InputTextFieldRef,
} from '@/src/components/input/SNTextField';
import { validateAllRefs } from '@/src/lib/inputValidation/utils';
import { fetchCreateUser, fetchUpdateUser } from '@/src/service/fetch/users';
import ModalLoading from '@/src/components/ModalLoading';
import SNNumberField, {
  InputNumberFieldRef,
} from '@/src/components/input/SNNumberField';

interface Properties {
  data?: UserDetail;
  onClose: () => void;
}

const styles = {
  container: css({
    padding: 'base',
    border: 'neutral',
    borderRadius: 'base',
    display: 'flex',
    flexDirection: 'column',
    gap: 'base',
    mb: 'base',
  }),
  containerTitle: css({
    fontWeight: 'semibold',
    fontSize: 'base',
  }),
  halfField: css({
    width: 'full',
    display: 'grid',
    gap: 'base',
    gridTemplateColumns: '1',
    lg: {
      gridTemplateColumns: '2',
    },
  }),
  ctaContainer: css({
    display: 'flex',
    justifyContent: 'end',
    width: 'full',
  }),
};

const FormUser = ({ data, onClose }: Properties) => {
  const inputFullNameRef = useRef<InputTextFieldRef>(null);
  const inpuEmailRef = useRef<InputTextFieldRef>(null);
  const inputPhoneRef = useRef<InputNumberFieldRef>(null);
  const inputWebsiteRef = useRef<InputTextFieldRef>(null);
  const inputUsernameRef = useRef<InputTextFieldRef>(null);
  const inputCompanynameRef = useRef<InputTextFieldRef>(null);
  const inputCompanyCatchPhraseRef = useRef<InputTextFieldRef>(null);
  const inputCompanyBsRef = useRef<InputTextFieldRef>(null);
  const inputAddressStreetRef = useRef<InputTextFieldRef>(null);
  const inputAddressSuiteRef = useRef<InputTextFieldRef>(null);
  const inputAddressCityRef = useRef<InputTextFieldRef>(null);
  const inputAddressZipcodeRef = useRef<InputTextFieldRef>(null);
  const inputAddressLatRef = useRef<InputNumberFieldRef>(null);
  const inputAddressLngRef = useRef<InputNumberFieldRef>(null);

  const [loading, setLoading] = useState(false);
  const [snackbarSuccessDelete, setSnacbarSuccessDelete] = useState<
    string | null
  >(null);
  const [snackbarFailedDelete, setSnacbarFailedDelete] = useState<
    string | null
  >(null);

  const handleSubmit = async () => {
    if (
      await validateAllRefs([
        inputFullNameRef.current,
        inpuEmailRef.current,
        inputPhoneRef.current,
        inputWebsiteRef.current,
        inputUsernameRef.current,
        inputCompanynameRef.current,
        inputCompanyCatchPhraseRef.current,
        inputCompanyBsRef.current,
        inputAddressStreetRef.current,
        inputAddressSuiteRef.current,
        inputAddressCityRef.current,
        inputAddressZipcodeRef.current,
        inputAddressLatRef.current,
        inputAddressLngRef.current,
      ])
    ) {
      setLoading(true);
      const payload: FetchCreateUserRequest = {
        name: inputFullNameRef.current!.value,
        username: inputUsernameRef.current!.value,
        email: inpuEmailRef.current!.value,
        address: {
          street: inputAddressStreetRef.current!.value,
          suite: inputAddressSuiteRef.current!.value,
          city: inputAddressCityRef.current!.value,
          zipcode: inputAddressZipcodeRef.current!.value,
          geo: {
            lat: inputAddressLatRef.current!.value!,
            lng: inputAddressLngRef.current!.value!,
          },
        },
        phone: inputPhoneRef.current!.value!,
        website: inputWebsiteRef.current!.value,
        company: {
          name: inputCompanynameRef.current!.value,
          catchPhrase: inputCompanyCatchPhraseRef.current!.value,
          bs: inputCompanyBsRef.current!.value,
        },
      };
      if (data) {
        const response = await fetchUpdateUser(data.id, payload);
        if (response.success) {
          setSnacbarSuccessDelete('User has been updated successfully');
          onClose();
        } else {
          setSnacbarFailedDelete('Error While updating user data');
        }
      } else {
        const response = await fetchCreateUser(payload);
        if (response.success) {
          setSnacbarSuccessDelete('New user has been create successfully');
          onClose();
        } else {
          setSnacbarFailedDelete('Error While create new user ');
        }
      }
      setLoading(true);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <SNTextField
          id="name"
          label="Full Name"
          placeholder="Enter full name"
          defaultValue={data?.name}
          inputRef={inputFullNameRef}
          rules="required"
        />
        <div className={styles.halfField}>
          <SNTextField
            id="email"
            label="Email"
            placeholder="Enter Email"
            defaultValue={data?.email}
            inputRef={inpuEmailRef}
            rules={['required', 'email']}
          />
          <SNNumberField
            id="phone"
            label="Phone"
            placeholder="Enter Phone"
            defaultValue={data?.phone}
            inputRef={inputPhoneRef}
            rules={['required', 'mobile-number']}
          />
        </div>
        <div className={styles.halfField}>
          <SNTextField
            id="userName"
            label="Username"
            placeholder="Enter Username"
            defaultValue={data?.username}
            inputRef={inputUsernameRef}
            rules="required"
            fullWidth
          />
          <SNTextField
            id="website"
            label="Website"
            placeholder="Enter Website"
            defaultValue={data?.website}
            inputRef={inputWebsiteRef}
            fullWidth
            rules="url"
          />
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.containerTitle}>Company</p>
        <SNTextField
          id="companyName"
          label="Company Name"
          placeholder="Enter Company Name"
          defaultValue={data?.company.name}
          inputRef={inputCompanynameRef}
          rules="required"
        />
        <div className={styles.halfField}>
          <SNTextField
            id="companyCatchPhrase"
            label="Company Catch Phrase"
            placeholder="Enter Company CatPhrase"
            defaultValue={data?.company.catchPhrase}
            inputRef={inputCompanyCatchPhraseRef}
            rules="required"
          />
          <SNTextField
            id="companyBs"
            label="Company Bs"
            placeholder="Enter Company Bs"
            defaultValue={data?.company.bs}
            inputRef={inputCompanyBsRef}
            rules="required"
          />
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.containerTitle}>Address</p>
        <div className={styles.halfField}>
          <SNTextField
            id="addressStreet"
            label="Street"
            placeholder="Enter Street Name"
            defaultValue={data?.address.street}
            inputRef={inputAddressStreetRef}
            rules="required"
          />
          <SNTextField
            id="addressSuite"
            label="Suite"
            placeholder="Enter Suite"
            defaultValue={data?.address.suite}
            inputRef={inputAddressSuiteRef}
            rules="required"
          />
        </div>
        <div className={styles.halfField}>
          <SNTextField
            id="addressCity"
            label="City"
            placeholder="Enter City Name"
            defaultValue={data?.address.city}
            inputRef={inputAddressCityRef}
            rules="required"
          />
          <SNTextField
            id="addressZip"
            label="Zip Code"
            placeholder="Enter Zip Code"
            defaultValue={data?.address.zipcode}
            inputRef={inputAddressZipcodeRef}
            rules="required"
          />
        </div>
        <div className={styles.halfField}>
          <SNNumberField
            id="addressLatitude"
            label="Latitude"
            placeholder="Enter Map Latitude Coordinate"
            defaultValue={data?.address.geo.lat}
            inputRef={inputAddressLatRef}
            rules="required"
          />
          <SNNumberField
            id="addressLongitude"
            label="Longitude"
            placeholder="Enter Map Longitude Coordinate"
            defaultValue={data?.address.geo.lng}
            inputRef={inputAddressLngRef}
            rules="required"
          />
        </div>
      </div>
      <div className={styles.ctaContainer}>
        <Button fullWidth variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      <ModalLoading open={loading} />
      <Snackbar
        open={snackbarSuccessDelete !== null}
        autoHideDuration={6000}
        onClose={() => setSnacbarSuccessDelete(null)}
        message="User has been deleted successfully"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
      <Snackbar
        open={snackbarFailedDelete !== null}
        autoHideDuration={3000}
        onClose={() => setSnacbarFailedDelete(null)}
      >
        <Alert
          onClose={() => setSnacbarFailedDelete(null)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Error while deleting user
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FormUser;
