use swc_common::{chain, pass::Optional, Mark};
use swc_ecma_parser::{Syntax, EsConfig};
use swc_ecma_ast::Ident;
use swc_ecma_utils::private_ident;
use swc_ecma_transforms_testing::{test, test_exec, test_fixture, Tester};

#[testing::fixture("../test/fixtures/**/input.js")]
fn fixture(input: PathBuf) {
    let output = input.with_file_name("output.js");
    test_fixture(
        Syntax:: (EsConfig {
            jsx: true,
            ..Default::default()
        }),
        &|t| chain!(tr(), properties(t, true)),
        &input,
        &output,
    );
}