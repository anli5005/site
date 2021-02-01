import Logo from 'components/Logo';
import Page from 'components/Page';

export default function Vampire() {
    return <Page title="Vampire Edition" noindex={true} logoAccent="red">
        <h1>:anliVampire:</h1>
        <Logo primary="red" size={512} text={["bloodbloodbloodblood", "bloodbloodbloodblood", "bloodbloodbloodblood", "bloodbloodbloodblood", "bloodbloodbloodblood"]} />
    </Page>;
}
