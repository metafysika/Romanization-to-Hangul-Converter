import React, { useState, useEffect } from 'react';
import {
  Textarea,
  Text,
  Tooltip,
  Card,
  tokens,
  Button,
  makeStyles,
  shorthands,
  useFluent,
  Popover, PopoverTrigger, PopoverSurface,
} from '@fluentui/react-components';
import { HANGUL_TRIE } from '../data/hangul.trie.js';
import '../styles/Romanizer.css';
import { useStyles } from '../styles/styles.jsx';
import { QuestionCircle24Regular } from '@fluentui/react-icons'; // Optional: for close icon

const Romanizer = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const styles = useStyles();
  const { theme } = useFluent();

  const convert = (roman) => {
    const hangul = [];
    let node = HANGUL_TRIE;

    for (let i = roman.length - 1; i >= 0; --i) {
      const r = roman[i].toUpperCase();
      let next = node[r];

      if (!next && node["$"]) {
        hangul.push(node["$"]);
        next = HANGUL_TRIE[r];
      }

      if (!next) {
        if (roman[i] !== "-") hangul.push(roman[i]);
        next = HANGUL_TRIE;
      }

      node = next;
    }

    if (node["$"]) hangul.push(node["$"]);
    return hangul.reverse().join("");
  };

  useEffect(() => {
    setOutput(convert(input));
  }, [input]);

  return (
    <div className={styles.root}>
      <Text size={600} weight="semibold" style={{ marginBottom: '16px' }}>
        Romanization → Hangul Converter
      </Text>
      <Text size={300} style={{ marginBottom: '24px', color: tokens.colorNeutralForeground3 }}>
        Converts romanized text to Hangul.
      </Text>
      <div className={styles.cardContainer}>
        <Card className={styles.card}>
          <div className={styles.infoRow}>
            <Tooltip content="Romanized Text">
              <Text weight="semibold" className={styles.label}>Romanized Text</Text>
            </Tooltip>
            <Popover>
              <PopoverTrigger>
                <Button
                  appearance="subtle"
                  icon={<QuestionCircle24Regular className={styles.infoIcon} />}
                  className={styles.infoButton}
                  aria-label="More info"
                />
              </PopoverTrigger>
              <PopoverSurface>
                <Text>
                  Use a hyphen (<b>-</b>) to separate syllables.<br />
                  For example:<br />
                  <b>baggeu</b> (<span lang="ko">바끄</span>) vs <b>bag-geu</b> (<span lang="ko">박그</span>)
                </Text>
              </PopoverSurface>
            </Popover>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type Romanized Korean here"
            resize="none"
            className={styles.textarea}
          />
        </Card>

        <Card className={styles.card}>
          <Text weight="semibold" className={styles.label}>Hangul Output</Text>
          <Textarea
            value={output}
            readOnly
            placeholder="Hangul output will appear here"
            resize="none"
            className={styles.textarea}
          />
        </Card>
      </div>
    <div>
        <Button
            appearance="secondary"
            disabled={!input}
            onClick={() => {
                setInput('');
                setOutput('');
            }}
            className={styles.clearButton}
        >
            Clear
        </Button>
        <Button
            appearance="primary"
            disabled={!output}
            style={{ marginLeft: '8px' }}
            onClick={() => {
            navigator.clipboard.writeText(output);
            }}
            className={styles.clearButton}
        >
            Copy
        </Button>
    </div>
    </div>
  );
};

export default Romanizer;