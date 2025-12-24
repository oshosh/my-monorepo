## Vitest를 알기전 사전 지식

### 1. 왜 번들링이 필요했을까?

Vitest를 이해하려면 먼저 “번들링”이 왜 등장했는지를 생각해볼 필요가 있다.

전에는 브라우저가 지금처럼 ES Module(import/export)을 지원하지 않았기 때문에, JavaScript 자체에서 파일 단위의 모듈 시스템이 사실상 없었다. 그 시절에는 여러 개의 .js 파일을 `<script>` 태그로 불러와야 했고, 특히 jQuery 기반 프로젝트에서는 “플러그인 → 페이지 코드”처럼 로딩 순서에 의존하는 구조가 흔했다.

문제는, 이런 방식에서는 의존성이 코드에 명시적으로 드러나지 않는다는 것이다.

어떤 파일이 어떤 파일을 필요로 하는지 코드를 보고 바로 알기 어렵고 로딩 순서가 꼬이면 런타임에서야 오류가 발생하며 프로젝트가 커질수록 관리가 점점 힘들어진다.

이런 배경 때문에 여러 개의 파일을 하나의 실행 단위로 묶고, 의존성을 자동으로 해결해주는 번들러(bundler) 가 필요해졌다.
즉, 번들링은 단순히 “파일을 합치는 것”이 아니라, 모듈을 기준으로 의존성을 분석하고 실행 순서를 보장하기 위한 핵심 과정이었다.

### 2. Webpack과 Vite의 개발 방식 비교

<figure style="margin: 0;">
  <table>
    <tr>
      <td>
        <img src="이미지1_URL" width="250">
      </td>
      <td>
        <img src="이미지2_URL" width="250">
      </td>
    </tr>
    <tr>
      <td>
        <b>webpack의 번들링은</b>
        <ul>
          <li>엔트리(entry)부터 시작해서</li>
          <li>의존성 그래프를 모두 만든 다음</li>
          <li>필요한 모듈을 변환하고(bundle)</li>
          <li>번들을 메모리/디스크에 만들어서 제공</li>
        </ul>
      </td>
      <td>
        <b>Vite의 개발 서버는</b>
        <ul>
            <li>번들링 없이 Native ESM을 그대로 사용해서</li>
            <li>브라우저 요청이 들어온 모듈만</li>
            <li>필요한 부분만 변환(transform)해서 제공하고</li>
            <li>빠른 서버 시작과 빠른 HMR(Hot Module Replacement)을 지원</li>
        </ul>
        </ul>
      </td>
    </tr>
  </table>

  <figcaption style="text-align:center; margin-top:10px; font-size:14px;">
    <a href="https://vite.dev/guide/why.html#the-problems" target="_blank">
      https://vite.dev/guide/why.html#the-problems
    </a>
  </figcaption>
</figure>

본질적으로 Go 언어로 작성된 모듈 번들러이기 때문에 자바스크립트는 인터프리터 언어이기 때문에 프로그램을 실행할 때 한줄 한줄 인터프리터가 기계어로 변환하는 작업을 실행합니다. 반면 Go의 경우에는 프로그램 실행 전 컴파일 단계에서 미리 소스 코드를 전부 기계어로 변환해놓습니다. 실행하는 단계에서 소스 코드가 기계어로 변환되는 작업이 생략됩니다.

## Vitest는 왜 필요한가?

결론 부터 말하자면 개발 환경에서는 잘 동작하는 코드가 테스트에서는 깨지거나, 테스트 환경을 맞추기 위해 설정이 복잡해지는 문제가 생긴다.

앞서 설명을 했지만 Vite가 등장하면서 프론트엔드 개발 경험은 크게 바뀌었다. 기존 Webpack 기반 개발환경에서는 프로젝트 규모가 커질수록 초기 빌드 시간이 길어지고, 개발 서버를 띄우는 것 자체가 부담스러웠다. 반면 Vite는 Native ESM 기반 개발 서버로, 필요한 모듈만 즉시 변환해 제공하는 구조를 갖고 있어 서버 구동 속도와 HMR 속도가 매우 빠르다.

그렇다면 테스트 환경은 어떨까?

기존 테스트 러너(Jest 등)는 기본적으로 Node 환경에서 돌아가며, 테스트 실행을 위해 코드 변환(트랜스파일)을 위해 Babel 또는 ts-jest 같은 설정이 필요했다. 또한 프로젝트가 Vite 기반이라면 코드가 ESM, TypeScript, JSX/TSX, CSS Modules, alias(import 경로), 환경변수(import.meta.env) 등 Vite의 설정과 긴밀하게 연결되어 있는데, 테스트 환경이 이를 그대로 이해하지 못하면 개발 환경과 테스트 환경이 서로 다른 설정을 따로 관리해야 한다.

### 1) Vite 기반 프로젝트와 “테스트 환경의 불일치” 문제

Vite는 내부적으로 esbuild(또는 Rollup)를 이용해 빠르게 변환하고, vite.config 기반으로 alias, plugin, 환경 변수를 적용한다. Jest 같은 기존 테스트 러너 사용으로 발 환경과 테스트 환경이 다르기 때문에 생기는 설정 비용이 커지는 것이다.

### 2) Vitest는 Vite 생태계에 맞춘 테스트 러너다

즉, Vitest는 테스트를 실행할 때 Vite의 설정(vite.config.ts)을 그대로 활용한다.
그래서 Vite 프로젝트에서 자주 쓰는 기능들을 별도 설정 없이 자연스럽게 지원한다.

### 3) 개발 경험

아래와 같은 개발 경험을 다양하게 지원한다.

- --watch 모드로 지속 실행
- --ui 옵션으로 브라우저 기반 테스트 UI 제공
- 실패한 테스트의 스택/출력 확인이 직관적
- Storybook 및 Playwright 같은 도구들과 연동이 비교적 자연스러움

## Nx 모노레포 환경에서 Vitest를 적용해보자.

버전에 따라 환경이나 설정이 달라질 수 있겠지만 현 환경을 토대로 HealthCheck 를 빠르게 해보자.

### 1. Nx + Vitest 설치

Nx에서 권장되는 Vitest Plugin Recipe에 따르면 간단한 명령어로 해결이 가능합니다. 또한 [버전간 일치를 통해 마이그레이션 가이드](https://nx.dev/docs/technologies/test-tools/vitest/introduction)를 제시 하고 있습니다.

```
nx add @nx/vitest
```

### 2. Vitest가 Nx의 target으로 등록되는지 모노레포 환경에서 정상적으로 실행되는지 점검 해보자.

#### 1) Nx에서 Vitest는 어떻게 실행되는가?

Nx에서 nx test <project>라는 명령은 내부적으로 “해당 프로젝트의 test target”을 실행하는 구조다.
즉, `nx test @my-monorepo/design-system` 명령 기반으로 실행된다.

```
"test": {
  // @nx/vitest:test executor를 사용해서 Vitest를 실행
  "executor": "@nx/vitest:test",
  "options": {
    // 테스트 환경 일치화
    "configFile": "packages/design-system/vite.config.mts",
    "reportsDirectory": "../../coverage/packages/design-system"
  }
}
```

#### 2) Nx workspace 단위에서 설정이 어떻게 관리되는가?

Nx의 전역 설정은 `nx.json`에서 정의한다. 앞서 `nx add @nx/vitest`을 적용했다면 아래와 같은 설정을 확인 할 수 있다.

위 설정을 통해 테스트 실행 전에 상위 의존성(다른 라이브러리들)을 먼저 build 해두도록 강제해서 “빌드되지 않은 패키지를 import하다가 테스트가 실패하는 문제”를 줄여준다.

```
"targetDefaults": {
    "test": {
      "dependsOn": ["^build"]
    },
},
"plugins": [
    {
    "plugin": "@nx/vite/plugin",
    "options": {
        "testTargetName": "test"
    }
    }
]
```

#### 3) 실제 실행해보기 (HealthCheck)

테스트 코드를 작성을 아래와 같이 작성 해보고 실제 실행이 되는지 확인을 해보자.

```
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('renders', () => {
    render(<Avatar>N</Avatar>);
    expect(screen.getByText('N')).toBeInTheDocument();
  });
});
```

실행 명령어는 아래와 같다.
여러 모드가 존재 하지만 주로 쓰는 모드로 두가지 정도를 더 소개하면 UI 모드(`--ui`) 및 캐시 제외 옵션(`--skip-nx-cache`) 로 추가가 가능하다.

```
nx test @my-monorepo/design-system
```

## Nx 모노레포 환경에서 Vitest를 적용하면서 만났던 오류와 해결 방안

### 1) 수동 설치로 인해 발생한 React UMD/중복 React 문제 + Vitest 미실행

증상

> Vitest 실행 또는 컴포넌트 테스트 실행 시 아래 오류가 발생했다.
>
> Error: A React Element from an older version of React was rendered  
> Multiple copies of the "react" package is used.  
> A library pre-bundled an old copy of "react"…  
> A compiler tries to "inline" JSX instead of using the runtime …

또한 특정 상황에서는 테스트가 아예 실행되지 않거나, React 관련 런타임 오류가 함께 발생했다.

#### 원인 1: Nx 전역 설정/플러그인 이해 부족 (수동 설치의 함정)

- 초기에 Nx에 대한 이해 없이 Vitest를 “수동 설치” 위주로 진행했기 때문에 Nx workspace 전역에 필요한 플러그인이 제대로 등록되지 않거나 프로젝트별 target 설정이 정상적으로 생성되지 않아서 테스트 실행 환경이 어긋나는 문제가 발생했다.

#### 해결

Nx 공식 문서에 따라 플러그인 설치를 표준 방식으로 다시 진행했다. 이후 nx.json 및 프로젝트 설정이 정상적으로 정리되면서 “Nx가 Vitest를 인식하지 못하는 문제”가 해결됐다.

#### 원인 2: 원인 2: 모노레포에서 React 버전이 중복 설치되며 “서로 다른 React”로 인식

`pnpm -r why react` 결과를 확인해보니, 루트는 `React 19`를 사용하고 있었는데 `packages/design-system`은 `React 18`을 직접 `dependencies`로 가지고 있었고 앱(`apps/my-new-app`)이 `design-system`을 link로 참조하면서
서로 다른 React 버전이 동시에 존재하는 상황이었다.

즉, 모노레포 내부에서 아래처럼 구성된 상태였다.

> Root: react@19  
> Design-system: react@18  
> App: Root react + Design-system react가 동시에 존재

이 경우 React는 “하나의 React 런타임으로 만들어진 컴포넌트는 같은 React로 렌더링되어야 한다”는 전제가 있기 때문에
React Element를 다른 React가 렌더링하는 순간 위 오류가 발생한다.

#### 해결

`Design-system`에서 React를 `dependencies`가 아닌 `peerDependencies`로 정리

디자인 시스템은 “라이브러리”이기 때문에 React를 직접 `dependencies`에 포함시키면 안 된다.
(라이브러리가 React를 직접 설치해버리면 React가 중복 설치되는 구조가 되기 때문이다.)

따라서 design-system 패키지를 아래 원칙으로 정리했다.

원칙

> 1. design-system은 React를 직접 설치하지 않는다
> 2. 대신 “React는 외부에서 주입받는다”라는 의미로 peerDependencies에 둔다
> 3. 루트/앱과 React 버전을 일치시킨다

```
"peerDependencies": {
  "react": "^19.0.3",
  "react-dom": "^19.0.3"
}
```

#### 원인 3: `.test.tsx`에서 `import React from 'react'`가 강제되는 문제

테스트 파일에서 JSX를 사용하면 아래와 같은 에러가 발생하며 import React from 'react'를 강제로 요구하는 경우가 있었다. 17 버전이후로 `JSX`를 `React.createElement`로 바꾸는 방식으로 `Babel`과 협업을 하여 번들 크기/실행 오버헤드가 줄고, 트리쉐이킹이 좋아지는 이점 생긴 것으로 알고 있다 그렇기 때문에 필요하지 않은데 요구로 한다는 것은 명백한 설정 오류라 판단 되었습니다.

이 문제는 대부분 아래 중 하나 때문에 발생한다.

- tsconfig에서 jsx 설정이 react로 되어 있어 “classic runtime”을 요구
- vite/vitest transform 과정에서 JSX runtime 설정이 누락

해결

- tsconfig.spec.json에서 jsx: "react-jsx" 설정을 명확히 한다.
- Vite config에서 @vitejs/plugin-react가 vitest 환경에서도 적용되도록 한다.

### 2) Vitest 실행 시 이전 Vitest를 계속 실행 시키는 현상

config를 바꿔도 반영되지 않거나 이전 테스트 결과가 계속 뜨거나 실제로는 코드가 바뀌었는데 테스트가 그대로 통과/실패하는 현상이 발생했다.

즉 “이전 Vitest가 계속 실행되는 것처럼 보이는 현상”이었고 `--skip-nx-cache --watch` 옵션을 통해 해결 하였다.
