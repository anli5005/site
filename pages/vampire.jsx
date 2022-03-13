import Logo from 'components/Logo';
import Page from 'components/Page';
import { TitleHeader } from 'components/TitleHeader';

export default function Vampire() {
    return <Page title="Vampire Edition" noindex={true} logoAccent="red">
        <TitleHeader>???</TitleHeader>
        <Logo primary="red" size={512} text={["bloodbloodbloodblood", "bloodbloodbloodblood", "bloodbloodbloodblood", "bloodbloodbloodblood", "bloodbloodbloodblood"]} />
    </Page>;
}
