function mySettings(props) {
  const steps = [
    'joris',
    'roy',
    'laurens',
    'elias',
    'julian',
    'thibaut',
    'philippe',
    'nils',
    'stijn',
    'arnaud',
    'klaas'
  ].map(name => <TextInput
          label={`${name} steps`}
          title={`${name} steps`}
          settingsKey={name}
          type="number"
          key={name}
        />);
  return (
    <Page>
      <Section
        title={<Text bold align="center">Simulate challenge</Text>}>
        {steps}       
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
